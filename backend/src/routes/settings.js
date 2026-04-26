import express from 'express';
import * as settingsController from '../controllers/settingsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/api-keys', authenticate, settingsController.updateApiKeys);
router.post('/sound-settings', authenticate, settingsController.updateSoundSettings);
router.post('/trading-preferences', authenticate, settingsController.updateTradingPreferences);
router.get('/', authenticate, settingsController.getSettings);

export default router;