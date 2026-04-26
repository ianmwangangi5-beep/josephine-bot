import express from 'express';
import * as tickController from '../controllers/tickController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/stream', authenticate, tickController.getTickStream);
router.post('/update', authenticate, tickController.updateTickStream);

export default router;