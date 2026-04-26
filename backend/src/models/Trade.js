import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contractId: String,
  tradeType: {
    type: String,
    enum: ['rise', 'fall', 'higher', 'lower', 'over', 'under', 'touch', 'no-touch', 'even', 'odd', 'matches', 'differs', 'accumulator'],
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  stake: {
    type: Number,
    required: true,
  },
  duration: Number,
  durationUnit: {
    type: String,
    enum: ['ticks', 'seconds', 'minutes', 'hours', 'days'],
  },
  prediction: String,
  barrier: Number,
  barrierOffset: Number,
  lastDigitPrediction: Number,
  growthRate: Number,
  takeProfit: Number,
  status: {
    type: String,
    enum: ['open', 'won', 'lost', 'cancelled'],
    default: 'open',
  },
  entryPrice: Number,
  exitPrice: Number,
  profit: Number,
  profitPercentage: Number,
  mode: {
    type: String,
    enum: ['manual', 'auto', 'swarm', 'scalp', 'fx'],
    default: 'manual',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: Date,
  tickHistory: [{
    digit: { type: String, required: true },
    price: Number,
    timestamp: Date,
  }],
});

export default mongoose.model('Trade', tradeSchema);