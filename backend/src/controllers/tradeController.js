import Trade from '../models/Trade.js';

export const placeManualTrade = async (req, res) => {
  try {
    const { tradeType, asset, stake, duration, durationUnit, prediction, barrier, barrierOffset, lastDigitPrediction, growthRate, takeProfit, allowEquals } = req.body;
    const userId = req.user.id;

    const trade = new Trade({
      userId,
      tradeType,
      asset,
      stake,
      duration,
      durationUnit,
      prediction,
      barrier,
      barrierOffset,
      lastDigitPrediction,
      growthRate,
      takeProfit,
      mode: 'manual',
      status: 'open',
    });

    await trade.save();

    res.status(201).json({ success: true, trade });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOpenTrades = async (req, res) => {
  try {
    const userId = req.user.id;
    const trades = await Trade.find({ userId, status: 'open' }).sort({ createdAt: -1 });
    res.json({ trades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const closeManualTrade = async (req, res) => {
  try {
    const { tradeId } = req.body;
    const userId = req.user.id;

    const trade = await Trade.findOne({ _id: tradeId, userId });
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    trade.status = 'cancelled';
    trade.closedAt = new Date();
    await trade.save();

    res.json({ success: true, trade });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTradeHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 100, skip = 0, mode } = req.query;
    
    let query = { userId };
    if (mode) query.mode = mode;

    const trades = await Trade.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Trade.countDocuments(query);

    res.json({ trades, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};