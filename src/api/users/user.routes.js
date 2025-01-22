import { Router } from 'express';
import upload from '../../middleware/upload.middleware.js';
import {
  createUserController,
  getUserByIdController,
  getAllUsersController,
  updateUserController,
  editPasswordController,
  deleteUserController,
} from './user.controller.js'

const router = Router();

const singleUpload = upload.single('avatar');

router.post('/', singleUpload, createUserController);
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.put('/:id', singleUpload, updateUserController);
router.patch('/:id', editPasswordController);
router.delete('/:id', deleteUserController);

export default router;
