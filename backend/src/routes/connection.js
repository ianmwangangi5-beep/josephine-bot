import express from 'express';
import * as connectionController from '../controllers/connectionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/connect', authenticate, connectionController.connectDeriv);
router.post('/disconnect', authenticate, connectionController.disconnectDeriv);
router.get('/status', authenticate, connectionController.getConnectionStatus);

export default router;