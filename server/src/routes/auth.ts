import express from 'express';
import { loginUser, newAccessToken, registerUser, sendEmail, confirmEmailCode, updatePassword } from '../controllers/auth';
import uploadFiles from '../utils/uploadFiles';

const router = express.Router();

router.post('/register', uploadFiles.none(), registerUser);

router.post('/login', uploadFiles.none(), loginUser);

router.post('/sendmail', uploadFiles.none(), sendEmail);

router.post('/confirmEmailCode', uploadFiles.none(), confirmEmailCode);

router.post('/update-password', uploadFiles.none(), updatePassword);

router.post('/refresh-token', uploadFiles.none(), newAccessToken);

export default router;