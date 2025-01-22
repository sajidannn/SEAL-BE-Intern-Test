import { Router } from 'express';
import { loginUserController, logoutUserController } from './auth.controller.js';
import { verifyAccessToken } from '../../middleware/authorization.middleware.js';

const router = Router();

router.post('/login', loginUserController);
router.post('/logout', verifyAccessToken, logoutUserController);

export default router;