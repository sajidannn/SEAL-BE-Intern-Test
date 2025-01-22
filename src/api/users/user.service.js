import {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  editPassword,
  deleteUser,
} from "./user.repository.js";
import { uploadImage, deleteImageByUrl } from "../../utils/cloudinary.js";
import NotFoundError from '../../exception/NotFoundError.js';
import InvariantError from '../../exception/InvariantError.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const verifyNewUser = async (email) => {
  const user = await getUserByEmail(email);

  if (user) {
    throw new InvariantError('Email is already exists');
  }
};

const createUserService = async ({ name, email, password, avatar }) => {
  await verifyNewUser(email);
  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarLink = await uploadImage(avatar, 'avatars');

  const userId = await createUser({
    id,
    name,
    email,
    password: hashedPassword,
    avatar: avatarLink,
  });

  if (!userId) {
    throw new Error('Create user failed');
  }

  return userId;
};

const getUserByIdService = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

const getAllUsersService = async () => {
  const users = await getAllUsers();

  return users;
};

const updateUserService = async ({ id, name, avatar }) => {
  const user = await getUserByIdService(id);

  let avatarLink = user.avatar;

  if (avatar) {
    avatarLink = await uploadImage(avatar, 'avatars');
    if (user.avatar) {
      await deleteImageByUrl(user.avatar);
    }
  }

  await updateUser({
    id,
    name,
    avatar: avatarLink,
  });
};


const editPasswordService = async ({ id, password, newPassword }) => {
  const user = await getUserByIdService(id);
  const userEmail = await getUserByEmail(user.email);
  const correctPassword = await bcrypt.compare(password, userEmail.password);

  if (!correctPassword) {
    throw new InvariantError('Password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await editPassword({
    id,
    password: hashedPassword,
  });
};

const deleteUserService = async (id) => {
  const user = await getUserByIdService(id);
  await deleteUser(id);
  deleteImageByUrl(user.avatar);
};

export {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  editPasswordService,
  deleteUserService,
}