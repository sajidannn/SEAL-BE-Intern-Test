import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from './task.repository.js';
import NotFoundError from '../../exception/NotFoundError.js';
import InvariantError from '../../exception/InvariantError.js';
import { nanoid } from 'nanoid';

const createTaskService = async ({ title, description, status, dueDate, userId, projectId }) => {
  const id = `task-${nanoid(16)}`;

  const taskId = await createTask({
    id,
    title,
    description,
    status,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    userId,
    projectId,
  });

  if (!taskId) {
    throw new InvariantError('Failed to create task');
  }

  return taskId;
};

const getAllTasksService = async () => {
  const tasks = await getAllTasks();

  if (!tasks || tasks.length === 0) {
    throw new NotFoundError('No tasks found');
  }

  return tasks;
};

const getTaskByIdService = async (taskId) => {
  const task = await getTaskById(taskId);

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  return task;
};

const updateTaskService = async ({ taskId, title, description, status, dueDate, userId, projectId, user }) => {
  const task = await getTaskByIdService(taskId);

  if (task.userId !== user.id || user.role !== 'ADMIN') {
    throw new InvariantError('You are not authorized to update this task');
  }

  await updateTask({
    id: taskId,
    title,
    description,
    status,
    dueDate: dueDate ? new Date(dueDate) : undefined,
    userId,
    projectId,
  });
};

const deleteTaskService = async (taskId, user) => {
  const task = await getTaskByIdService(taskId);

  if (task.userId !== user.id || user.role !== 'ADMIN') {
    throw new InvariantError('You are not authorized to delete this task');
  }

  await deleteTask(taskId);
};

export {
  createTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
};
