import { Router } from 'express';
import upload from '../../middleware/upload.middleware.js';
import { verifyOwner } from '../../middleware/authorization.middleware.js';
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
router.get('/:userId', getUserByIdController);
router.put('/:userId', verifyOwner, singleUpload, updateUserController);
router.patch('/:userId', verifyOwner, editPasswordController);
router.delete('/:userId', verifyOwner, deleteUserController);

export default router;
