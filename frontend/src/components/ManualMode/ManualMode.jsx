import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ManualMode.css';
import RiseFallTradeForm from './TradeTypes/RiseFallTradeForm';
import HigherLowerTradeForm from './TradeTypes/HigherLowerTradeForm';
import OverUnderTradeForm from './TradeTypes/OverUnderTradeForm';
import TouchNoTouchTradeForm from './TradeTypes/TouchNoTouchTradeForm';
import EvenOddTradeForm from './TradeTypes/EvenOddTradeForm';
import MatchesDiffersTradeForm from './TradeTypes/MatchesDiffersTradeForm';
import AccumulatorTradeForm from './TradeTypes/AccumulatorTradeForm';
import LiveDigitTracker from './LiveDigitTracker';

const ManualMode = () => {
  const [selectedTradeType, setSelectedTradeType] = useState('rise-fall');
  const [selectedAsset, setSelectedAsset] = useState('R_100');
  const [lastDigits, setLastDigits] = useState([]);
  const [openTrades, setOpenTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const wsRef = useRef(null);

  const ASSETS = [
    { id: 'R_100', name: 'Volatility 100 Index', group: 'Synthetic' },
    { id: 'R_75', name: 'Volatility 75 Index', group: 'Synthetic' },
    { id: 'R_50', name: 'Volatility 50 Index', group: 'Synthetic' },
    { id: 'EURUSD', name: 'EUR/USD', group: 'Forex' },
    { id: 'GBPUSD', name: 'GBP/USD', group: 'Forex' },
    { id: 'USDJPY', name: 'USD/JPY', group: 'Forex' },
  ];

  const TRADE_TYPES = [
    { id: 'rise-fall', name: 'Rise / Fall', icon: '📈' },
    { id: 'higher-lower', name: 'Higher / Lower', icon: '⬆️' },
    { id: 'over-under', name: 'Over / Under', icon: '🎯' },
    { id: 'touch-no-touch', name: 'Touch / No Touch', icon: '👆' },
    { id: 'even-odd', name: 'Even / Odd', icon: '🔢' },
    { id: 'matches-differs', name: 'Matches / Differs', icon: '🔄' },
    { id: 'accumulator', name: 'Accumulators', icon: '📊' },
  ];

  useEffect(() => {
    fetchOpenTrades();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    subscribeToAsset(selectedAsset);
  }, [selectedAsset]);

  const fetchOpenTrades = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/trades/open', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenTrades(response.data.trades);
    } catch (err) {
      console.error('Error fetching trades:', err);
    }
  };

  const connectWebSocket = () => {
    const token = localStorage.getItem('token');
    wsRef.current = new WebSocket(`ws://localhost:5000?token=${token}`);

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'tick') {
          handleNewTick(data);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection lost. Reconnecting...');
    };
  };

  const subscribeToAsset = (asset) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          action: 'subscribe',
          asset,
        })
      );
    }
  };

  const handleNewTick = (data) => {
    // CRITICAL: Store digit as string to preserve '0'
    const digitStr = String(data.digit).trim();
    
    setLastDigits((prev) => {
      const updated = [...prev, digitStr];
      return updated.length > 10 ? updated.slice(-10) : updated;
    });
  };

  const handlePlaceTrade = async (tradeData) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/trades/place-manual',
        {
          ...tradeData,
          tradeType: selectedTradeType,
          asset: selectedAsset,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOpenTrades([response.data.trade, ...openTrades]);
      playSound('opened');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place trade');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTrade = async (tradeId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/trades/close-manual',
        { tradeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOpenTrades((prev) => prev.filter((trade) => trade._id !== tradeId));
      playSound('closed');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to close trade');
    }
  };

  const playSound = (type) => {
    // Sound playback logic - will implement with actual audio files
    console.log(`Playing ${type} sound`);
  };

  const renderTradeForm = () => {
    const props = {
      onPlaceTrade: handlePlaceTrade,
      loading,
      lastDigits,
    };

    switch (selectedTradeType) {
      case 'rise-fall':
        return <RiseFallTradeForm {...props} />;
      case 'higher-lower':
        return <HigherLowerTradeForm {...props} />;
      case 'over-under':
        return <OverUnderTradeForm {...props} />;
      case 'touch-no-touch':
        return <TouchNoTouchTradeForm {...props} />;
      case 'even-odd':
        return <EvenOddTradeForm {...props} />;
      case 'matches-differs':
        return <MatchesDiffersTradeForm {...props} />;
      case 'accumulator':
        return <AccumulatorTradeForm {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="manual-mode-container">
      <div className="manual-header">
        <h2>Manual Trading Mode</h2>
        <div className="header-controls">
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="asset-selector"
          >
            {ASSETS.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <LiveDigitTracker digits={lastDigits} />

      {error && <div className="error-banner">{error}</div>}

      <div className="manual-content">
        <div className="trade-types-panel">
          <h3>Trade Types</h3>
          <div className="trade-types-grid">
            {TRADE_TYPES.map((type) => (
              <button
                key={type.id}
                className={`trade-type-btn ${selectedTradeType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedTradeType(type.id)}
              >
                <span className="icon">{type.icon}</span>
                <span className="name">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="trade-form-panel">{renderTradeForm()}</div>

        <div className="open-trades-panel">
          <h3>Open Trades ({openTrades.length})</h3>
          <div className="trades-list">
            {openTrades.length === 0 ? (
              <p className="no-trades">No open trades</p>
            ) : (
              openTrades.map((trade) => (
                <div key={trade._id} className="trade-item">
                  <div className="trade-info">
                    <span className="trade-type">{trade.tradeType}</span>
                    <span className="trade-stake">${trade.stake}</span>
                  </div>
                  <button
                    className="close-trade-btn"
                    onClick={() => handleCloseTrade(trade._id)}
                  >
                    Close
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualMode;