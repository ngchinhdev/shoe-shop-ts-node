import express from 'express';
import { loginUser, newAccessToken, registerUser, sendEmail } from '../controllers/auth';
import uploadFiles from '../utils/uploadFiles';

const router = express.Router();

router.post('/register', uploadFiles.none(), registerUser);

router.post('/login', uploadFiles.none(), loginUser);

router.post('/sendmail', uploadFiles.none(), sendEmail);

router.post('/refresh-token', uploadFiles.none(), newAccessToken);

export default router;