import User from '../models/User.js';
import axios from 'axios';

export const connectDeriv = async (req, res) => {
  try {
    const { appId, apiKey, isDemo } = req.body;
    const userId = req.user.id;

    // Validate Deriv credentials
    const response = await axios.get('https://api.deriv.com/api/v3/', {
      params: {
        authorize: apiKey,
      },
    });

    if (response.data.authorize) {
      const accountKey = isDemo ? 'derivDemoKey' : 'derivRealKey';
      const accountId = isDemo ? 'derivDemoAppId' : 'derivRealAppId';

      const user = await User.findByIdAndUpdate(
        userId,
        {
          [accountKey]: apiKey,
          [accountId]: appId,
          [`${isDemo ? 'demo' : 'real'}ConnectionStatus`]: 'connected',
        },
        { new: true }
      );

      return res.json({ success: true, message: 'Connected to Deriv', user });
    }

    res.status(400).json({ error: 'Invalid Deriv credentials' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const disconnectDeriv = async (req, res) => {
  try {
    const { isDemo } = req.body;
    const userId = req.user.id;
    const statusKey = isDemo ? 'demoConnectionStatus' : 'realConnectionStatus';

    const user = await User.findByIdAndUpdate(
      userId,
      { [statusKey]: 'disconnected' },
      { new: true }
    );

    res.json({ success: true, message: 'Disconnected from Deriv', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConnectionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      demoStatus: user.demoConnectionStatus,
      realStatus: user.realConnectionStatus,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};