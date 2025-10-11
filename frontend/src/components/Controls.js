import React, { useState } from 'react';

const Controls = ({ 
  isConnected, 
  isStreaming, 
  currentKeyword, 
  onStartStreaming, 
  onStopStreaming 
}) => {
  const [keyword, setKeyword] = useState('technology');

  const handleStartStreaming = () => {
    if (keyword.trim()) {
      onStartStreaming(keyword.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStartStreaming();
  };

  return (
    <div className="row bg-light p-3 rounded mb-3">
      <div className="col-md-8">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="fas fa-hashtag"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter keyword or hashtag (e.g., AI, Python, JavaScript)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={isStreaming}
            />
            {!isStreaming ? (
              <button 
                className="btn btn-primary btn-lg" 
                type="submit"
                disabled={!isConnected || !keyword.trim()}
              >
                <i className="fas fa-play me-2"></i>
                Start Streaming
              </button>
            ) : (
              <button 
                className="btn btn-danger btn-lg" 
                type="button"
                onClick={onStopStreaming}
              >
                <i className="fas fa-stop me-2"></i>
                Stop Streaming
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="col-md-4">
        <div className="d-flex justify-content-end h-100 align-items-center">
          <div className="d-flex gap-3">
            <span className={`badge ${isConnected ? 'bg-success' : 'bg-danger'} fs-6`}>
              <i className={`fas fa-circle ${isConnected ? 'fa-beat' : ''} me-1`}></i>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
            {isStreaming && (
              <span className="badge bg-info fs-6">
                <i className="fas fa-satellite-dish fa-beat me-1"></i>
                Streaming: {currentKeyword}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;