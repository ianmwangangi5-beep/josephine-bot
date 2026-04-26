import TickStream from '../models/TickStream.js';

export const getTickStream = async (req, res) => {
  try {
    const userId = req.user.id;
    const { asset } = req.query;

    let tickStream = await TickStream.findOne({ userId, asset });
    if (!tickStream) {
      tickStream = new TickStream({ userId, asset });
      await tickStream.save();
    }

    res.json({ tickStream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTickStream = async (req, res) => {
  try {
    const userId = req.user.id;
    const { asset, digit, price } = req.body;

    // CRITICAL: Ensure digit is stored as STRING to preserve '0'
    const digitStr = String(digit).trim();
    
    if (!/^\d$/.test(digitStr)) {
      return res.status(400).json({ error: 'Invalid digit. Must be 0-9' });
    }

    let tickStream = await TickStream.findOne({ userId, asset });
    if (!tickStream) {
      tickStream = new TickStream({ userId, asset });
    }

    // Keep only last 10 digits
    if (tickStream.lastDigits.length >= 10) {
      tickStream.lastDigits.shift();
    }
    tickStream.lastDigits.push(digitStr);

    // Update digit frequency
    const freq = tickStream.digitFrequency || new Map();
    freq.set(digitStr, (freq.get(digitStr) || 0) + 1);
    tickStream.digitFrequency = freq;

    tickStream.lastPrice = price;
    tickStream.lastUpdate = new Date();
    tickStream.tickCount += 1;

    await tickStream.save();

    res.json({ success: true, tickStream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};