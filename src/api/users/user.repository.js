import prisma from '../../database/index.js';

const createUser = async ({ id, name, email, password, avatar }) => {
  const user = await prisma.user.create({
    data: {
      id,
      name,
      email,
      password,
      avatar
    },
  });

  return user.id;
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const updateUser = async ({ id, name, avatar, tasks }) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      avatar,
      tasks,
    },
  });

  return user;
};

const editPassword = async ({ id, password }) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
}

export {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
  editPassword,
  deleteUser,
};