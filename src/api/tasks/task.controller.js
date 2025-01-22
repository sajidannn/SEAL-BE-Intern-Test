import {
  createTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from './task.service.js';
import taskValidator from '../../validator/tasks/index.js';

const createTaskController = async (req, res, next) => {
  try {
    const { title, description, status, dueDate, userId, projectId } = req.body;
    taskValidator.validateTaskPayload({ title, description, status, dueDate, userId, projectId });

    const taskId = await createTaskService({
      title,
      description,
      status,
      dueDate,
      userId,
      projectId,
    });

    res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      data: {
        taskId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasksController = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();

    res.status(200).json({
      status: 'success',
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskByIdController = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await getTaskByIdService(taskId);

    res.status(200).json({
      status: 'success',
      message: 'Task retrieved successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, dueDate, userId, projectId } = req.body;
    const user = req.user;
    taskValidator.validateTaskUpdatePayload({ title, description, status, dueDate, userId, projectId });

    await updateTaskService({
      taskId,
      title,
      description,
      status,
      dueDate,
      userId,
      projectId,
      user,
    });

    res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const user = req.user;

    await deleteTaskService(taskId, user);

    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
};
