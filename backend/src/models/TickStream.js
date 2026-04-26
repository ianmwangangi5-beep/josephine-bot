import mongoose from 'mongoose';

const tickStreamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  lastDigits: {
    type: [String],
    default: [],
  },
  lastPrice: Number,
  lastUpdate: Date,
  tickCount: {
    type: Number,
    default: 0,
  },
  digitFrequency: {
    type: Map,
    of: Number,
    default: new Map(),
  },
});

export default mongoose.model('TickStream', tickStreamSchema);