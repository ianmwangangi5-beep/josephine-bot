import React, { useState } from 'react';

const OverUnderTradeForm = ({ onPlaceTrade, loading }) => {
  const [formData, setFormData] = useState({
    duration: '5',
    durationUnit: 'ticks',
    lastDigitPrediction: '5',
    stake: '10',
    prediction: 'over',
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
      <h3>Over / Under (Digits)</h3>

      <div className="form-group">
        <label>Prediction</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="prediction"
              value="over"
              checked={formData.prediction === 'over'}
              onChange={handleChange}
            />
            🔼 Over
          </label>
          <label>
            <input
              type="radio"
              name="prediction"
              value="under"
              checked={formData.prediction === 'under'}
              onChange={handleChange}
            />
            🔽 Under
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Last Digit Prediction (0-9)</label>
        <select
          name="lastDigitPrediction"
          value={formData.lastDigitPrediction}
          onChange={handleChange}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <option key={num} value={String(num)}>
              {num}
            </option>
          ))}
        </select>
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

export default OverUnderTradeForm;