import React, { useState } from 'react';

const Controls = ({ 
  isConnected, 
  isStreaming, 
  currentKeyword, 
  onStartStreaming, 
  onStopStreaming 
}) => {
  const [keyword, setKeyword] = useState('technology, AI, programming');
  const [useRealAPI, setUseRealAPI] = useState(false);

  const handleStartStreaming = () => {
    if (keyword.trim()) {
      // Split by commas and clean up
      const keywords = keyword.split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);
      
      if (keywords.length > 0) {
        onStartStreaming(keywords, useRealAPI);
      }
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
          <div className="input-group mb-2">
            <span className="input-group-text bg-primary text-white">
              <i className="fas fa-hashtag"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter keywords separated by commas (e.g., AI, Python, JavaScript)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={isStreaming}
            />
          </div>
          
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="useRealAPI"
              checked={useRealAPI}
              onChange={(e) => setUseRealAPI(e.target.checked)}
              disabled={isStreaming}
            />
            <label className="form-check-label" htmlFor="useRealAPI">
              Use Real Twitter API (requires API keys)
            </label>
          </div>

          <div className="d-flex gap-2">
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
            
            <button 
              className="btn btn-outline-secondary btn-lg"
              type="button"
              onClick={() => window.open('http://localhost:8000/api/export/csv', '_blank')}
              disabled={!isStreaming}
            >
              <i className="fas fa-download me-2"></i>
              Export CSV
            </button>
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