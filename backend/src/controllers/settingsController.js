import User from '../models/User.js';

export const updateApiKeys = async (req, res) => {
  try {
    const { geminiKey, grokKey, twelveDataKey, binanceKey, alphaVantageKey } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        apiKeys: {
          gemini: geminiKey,
          grok: grokKey,
          twelveData: twelveDataKey,
          binance: binanceKey,
          alphaVantage: alphaVantageKey,
        },
      },
      { new: true }
    );

    res.json({ success: true, message: 'API keys updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSoundSettings = async (req, res) => {
  try {
    const { winSound, lossSound, openedSound } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        soundSettings: {
          winSound,
          lossSound,
          openedSound,
        },
      },
      { new: true }
    );

    res.json({ success: true, message: 'Sound settings updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTradingPreferences = async (req, res) => {
  try {
    const { maxDailyLoss, maxWeeklyLoss, dynamicStake, stakeMultiplier } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        tradingPreferences: {
          maxDailyLoss,
          maxWeeklyLoss,
          dynamicStake,
          stakeMultiplier,
        },
      },
      { new: true }
    );

    res.json({ success: true, message: 'Trading preferences updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      apiKeys: user.apiKeys,
      soundSettings: user.soundSettings,
      tradingPreferences: user.tradingPreferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};