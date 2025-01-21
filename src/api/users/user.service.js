import {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  editPassword,
  deleteUser,
} from "./user.repository.js";
import { uploadImage } from "../../utils/cloudinary.js";
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



export {
  createUserService,
}