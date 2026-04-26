import React, { useState } from 'react';

const HigherLowerTradeForm = ({ onPlaceTrade, loading }) => {
  const [formData, setFormData] = useState({
    duration: '5',
    durationUnit: 'ticks',
    barrierOffset: '0.50',
    stake: '10',
    prediction: 'higher',
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
      <h3>Higher / Lower Trade</h3>

      <div className="form-group">
        <label>Prediction</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="prediction"
              value="higher"
              checked={formData.prediction === 'higher'}
              onChange={handleChange}
            />
            ⬆️ Higher
          </label>
          <label>
            <input
              type="radio"
              name="prediction"
              value="lower"
              checked={formData.prediction === 'lower'}
              onChange={handleChange}
            />
            ⬇️ Lower
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Barrier Offset</label>
        <div className="barrier-inputs">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, barrierOffset: String(parseFloat(prev.barrierOffset) - 0.10) }))}
            className="offset-btn"
          >
            -
          </button>
          <input type="text" value={formData.barrierOffset} readOnly />
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, barrierOffset: String(parseFloat(prev.barrierOffset) + 0.10) }))}
            className="offset-btn"
          >
            +
          </button>
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

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Placing Trade...' : '🎯 Place Trade'}
      </button>
    </form>
  );
};

export default HigherLowerTradeForm;