import { Router } from 'express';
import upload from '../../middleware/upload.middleware.js';
import { createUserController } from './user.controller.js'

const router = Router();

const singleUpload = upload.single('avatar');

router.post('/', singleUpload, createUserController);

export default router;
