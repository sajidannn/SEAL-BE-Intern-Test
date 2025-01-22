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
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          dueDate: true,
        }
      }
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
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      tasks: true,
    },
  });

  return users;
};

const updateUser = async ({ id, name, avatar }) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      avatar,
    },
  });
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
  await prisma.user.delete({
    where: {
      id,
    },
  });
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