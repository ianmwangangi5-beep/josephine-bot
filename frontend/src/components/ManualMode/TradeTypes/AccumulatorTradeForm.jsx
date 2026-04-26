import React, { useState } from 'react';

const AccumulatorTradeForm = ({ onPlaceTrade, loading }) => {
  const [formData, setFormData] = useState({
    stake: '10',
    growthRate: '1',
    takeProfit: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceTrade(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="trade-form">
      <h3>Accumulators</h3>

      <div className="form-group">
        <label>Growth Rate (%)</label>
        <div className="radio-group">
          {[1, 2, 3, 4, 5].map((rate) => (
            <label key={rate}>
              <input
                type="radio"
                name="growthRate"
                value={String(rate)}
                checked={formData.growthRate === String(rate)}
                onChange={handleChange}
              />
              {rate}%
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Stake Amount ($)</label>
        <input
          type="number"
          name="stake"
          value={formData.stake}
          onChange={handleChange}
          min="1"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label>Take Profit at Price (Optional)</label>
        <input
          type="number"
          name="takeProfit"
          value={formData.takeProfit}
          onChange={handleChange}
          placeholder="Leave empty for no auto-close"
          step="0.01"
        />
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Placing Trade...' : '🎯 Place Trade'}
      </button>
    </form>
  );
};

export default AccumulatorTradeForm;