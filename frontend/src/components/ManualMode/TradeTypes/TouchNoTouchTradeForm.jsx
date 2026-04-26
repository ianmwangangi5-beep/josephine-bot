import React, { useState } from 'react';

const TouchNoTouchTradeForm = ({ onPlaceTrade, loading }) => {
  const [formData, setFormData] = useState({
    duration: '5',
    durationUnit: 'minutes',
    barrier: '100',
    stake: '10',
    prediction: 'touch',
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
      <h3>Touch / No Touch</h3>

      <div className="form-group">
        <label>Prediction</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="prediction"
              value="touch"
              checked={formData.prediction === 'touch'}
              onChange={handleChange}
            />
            👆 Touch
          </label>
          <label>
            <input
              type="radio"
              name="prediction"
              value="no-touch"
              checked={formData.prediction === 'no-touch'}
              onChange={handleChange}
            />
            ✋ No Touch
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Barrier Price Level</label>
        <input
          type="number"
          name="barrier"
          value={formData.barrier}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>Duration</label>
        <div className="duration-inputs">
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
          />
          <select name="durationUnit" value={formData.durationUnit} onChange={handleChange}>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
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

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Placing Trade...' : '🎯 Place Trade'}
      </button>
    </form>
  );
};

export default TouchNoTouchTradeForm;