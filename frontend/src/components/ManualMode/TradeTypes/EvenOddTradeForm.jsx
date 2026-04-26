import React, { useState } from 'react';

const EvenOddTradeForm = ({ onPlaceTrade, loading }) => {
  const [formData, setFormData] = useState({
    duration: '5',
    durationUnit: 'ticks',
    stake: '10',
    prediction: 'even',
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
      <h3>Even / Odd (Digits)</h3>

      <div className="form-group">
        <label>Prediction</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="prediction"
              value="even"
              checked={formData.prediction === 'even'}
              onChange={handleChange}
            />
            2️⃣ Even (0,2,4,6,8)
          </label>
          <label>
            <input
              type="radio"
              name="prediction"
              value="odd"
              checked={formData.prediction === 'odd'}
              onChange={handleChange}
            />
            1️⃣ Odd (1,3,5,7,9)
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Duration (1-10 Ticks)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          max="10"
        />
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

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Placing Trade...' : '🎯 Place Trade'}
      </button>
    </form>
  );
};

export default EvenOddTradeForm;