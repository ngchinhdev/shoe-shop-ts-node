import express from 'express';
import { loginUser, newAccessToken, registerUser } from '../controllers/auth';
import uploadFiles from '../utils/uploadFiles';

const router = express.Router();

router.post('/register', uploadFiles.none(), registerUser);

router.post('/login', uploadFiles.none(), loginUser);

router.post('/refresh-token', uploadFiles.none(), newAccessToken);

export default router;