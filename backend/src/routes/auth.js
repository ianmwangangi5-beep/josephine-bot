import express from 'express';
import * as authController from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google-auth', authController.googleAuth);
router.post('/update-whatsapp', authenticate, authController.updateWhatsApp);
router.get('/profile', authenticate, authController.getProfile);

export default router;