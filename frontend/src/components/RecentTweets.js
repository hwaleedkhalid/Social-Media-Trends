import React from 'react';

const RecentTweets = ({ tweets }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-danger';
      default:
        return 'text-warning';
    }
  };

  return (
    <div className="card h-100">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">
          <i className="fas fa-list-alt me-2"></i>
          Recent Tweets
        </h5>
      </div>
      <div className="card-body p-0">
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {tweets.length === 0 ? (
            <div className="text-center text-muted p-4">
              <i className="fas fa-inbox fa-3x mb-3"></i>
              <p>No tweets yet. Start streaming to see tweets here.</p>
            </div>
          ) : (
            tweets.map((tweet, index) => (
              <div key={index} className="border-bottom p-3 tweet-item">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="fw-bold text-primary">@{tweet.user}</span>
                  <span className={`badge ${getSentimentColor(tweet.sentiment)} bg-light`}>
                    {getSentimentIcon(tweet.sentiment)} {tweet.sentiment}
                  </span>
                </div>
                <p className="mb-2 tweet-text">{tweet.text}</p>
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  {tweet.time}
                </small>
              </div>
            )).reverse()
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTweets;