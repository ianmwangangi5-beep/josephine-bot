import express from 'express';
import * as tradeController from '../controllers/tradeController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/place-manual', authenticate, tradeController.placeManualTrade);
router.get('/open', authenticate, tradeController.getOpenTrades);
router.post('/close-manual', authenticate, tradeController.closeManualTrade);
router.get('/history', authenticate, tradeController.getTradeHistory);

export default router;