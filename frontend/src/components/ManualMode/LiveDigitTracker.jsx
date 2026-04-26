import React from 'react';
import './LiveDigitTracker.css';

const LiveDigitTracker = ({ digits = [] }) => {
  return (
    <div className="digit-tracker">
      <div className="digit-tracker-header">
        <h3>Live Digit Tracker</h3>
        <span className="digit-count">{digits.length} Ticks</span>
      </div>
      <div className="digits-container">
        {digits.length === 0 ? (
          <p className="no-digits">Waiting for ticks...</p>
        ) : (
          <div className="digits-row">
            {digits.map((digit, index) => {
              const isEven = parseInt(digit) % 2 === 0;
              const isZero = digit === '0';
              return (
                <div
                  key={index}
                  className={`digit-pill ${
                    isZero ? 'zero' : isEven ? 'even' : 'odd'
                  } ${index === digits.length - 1 ? 'latest' : ''}`}
                  title={`Tick ${index + 1}: ${digit}`}
                >
                  {digit}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="digit-stats">
        {digits.length > 0 && (
          <>
            <div className="stat">
              <span className="label">Latest Digit:</span>
              <span className="value">{digits[digits.length - 1]}</span>
            </div>
            <div className="stat">
              <span className="label">Total Ticks:</span>
              <span className="value">{digits.length}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveDigitTracker;