import prisma from '../../database/index.js';

const createTask = async ({ id, title, description, status, dueDate, userId, projectId }) => {
  const task = await prisma.task.create({
    data: {
      id,
      title,
      description,
      status: status || 'PENDING',
      dueDate,
      userId,
      projectId,
    },
  });

  return task.id;
};

const getTaskById = async (id) => {
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  return task;
};

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      dueDate: true,
      userId: true,
      projectId: true,
    },
  });

  return tasks;
};

const updateTask = async ({ id, title, description, status, dueDate, userId, projectId }) => {
  await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
      dueDate,
      userId,
      projectId,
    },
  });
};

const deleteTask = async (id) => {
  await prisma.task.delete({
    where: {
      id,
    },
  });
};

export {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
