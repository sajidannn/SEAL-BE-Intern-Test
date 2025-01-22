import { Router } from 'express';
import { verifyAdmin, verifyAccessToken } from '../../middleware/authorization.middleware.js';
import {
  createProjectController,
  getProjectByIdController,
  getAllProjectsController,
  updateProjectController,
  deleteProjectController,
} from './project.controller.js';

const router = Router();

router.post('/', verifyAdmin, createProjectController);
router.get('/', verifyAccessToken, getAllProjectsController);
router.get('/:projectId', verifyAccessToken, getProjectByIdController);
router.put('/:projectId', verifyAdmin, updateProjectController);
router.delete('/:projectId', verifyAdmin, deleteProjectController);

export default router;