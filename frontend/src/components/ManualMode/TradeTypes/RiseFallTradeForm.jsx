import React, { useState } from 'react';

const RiseFallTradeForm = ({ onPlaceTrade, loading, lastDigits }) => {
  const [formData, setFormData] = useState({
    duration: '5',
    durationUnit: 'ticks',
    stake: '10',
    prediction: 'rise',
    allowEquals: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceTrade(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="trade-form">
      <h3>Rise / Fall Trade</h3>
      
      <div className="form-group">
        <label>Prediction</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="prediction"
              value="rise"
              checked={formData.prediction === 'rise'}
              onChange={handleChange}
            />
            📈 Price Will Rise
          </label>
          <label>
            <input
              type="radio"
              name="prediction"
              value="fall"
              checked={formData.prediction === 'fall'}
              onChange={handleChange}
            />
            📉 Price Will Fall
          </label>
        </div>
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
            max="365"
          />
          <select name="durationUnit" value={formData.durationUnit} onChange={handleChange}>
            <option value="ticks">Ticks</option>
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
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

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="allowEquals"
            checked={formData.allowEquals}
            onChange={handleChange}
          />
          Allow Equals (Optional)
        </label>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Placing Trade...' : '🎯 Place Trade'}
      </button>
    </form>
  );
};

export default RiseFallTradeForm;