import { Router } from 'express';
import { verifyAccessToken, verifyOwner } from '../../middleware/authorization.middleware.js';
import {
  createTaskController,
  getTaskByIdController,
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
} from './task.controller.js';

const router = Router();

router.post('/', verifyOwner, createTaskController);
router.get('/', verifyAccessToken, getAllTasksController);
router.get('/:taskId', verifyAccessToken, getTaskByIdController);
router.put('/:taskId', verifyAccessToken, updateTaskController);
router.delete('/:taskId', verifyAccessToken, deleteTaskController);

export default router;