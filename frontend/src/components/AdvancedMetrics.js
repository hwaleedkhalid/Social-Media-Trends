import React from 'react';

const AdvancedMetrics = ({ data }) => {
  const { total_tweets, sentiment_distribution, engagement_metrics } = data;
  
  // Calculate sentiment percentages safely
  const sentimentPercentages = total_tweets > 0 ? {
    positive: (sentiment_distribution.positive / total_tweets) * 100,
    neutral: (sentiment_distribution.neutral / total_tweets) * 100,
    negative: (sentiment_distribution.negative / total_tweets) * 100
  } : { positive: 0, neutral: 0, negative: 0 };

  // Determine dominant sentiment
  const getDominantSentiment = () => {
    if (total_tweets === 0) return { sentiment: 'N/A', percentage: 0 };
    
    const maxSentiment = Math.max(
      sentimentPercentages.positive,
      sentimentPercentages.neutral,
      sentimentPercentages.negative
    );
    
    let sentiment = 'NEUTRAL';
    if (maxSentiment === sentimentPercentages.positive) sentiment = 'POSITIVE';
    if (maxSentiment === sentimentPercentages.negative) sentiment = 'NEGATIVE';
    
    return { sentiment, percentage: maxSentiment };
  };

  const dominantSentiment = getDominantSentiment();

  return (
    <div className="row mt-4">
      <div className="col-md-4 mb-3">
        <div className="card bg-light h-100">
          <div className="card-body text-center">
            <h6 className="card-title text-muted">Average Engagement</h6>
            <h3 className="text-primary">
              {engagement_metrics?.avg_engagement?.toFixed(1) || '0.0'}
            </h3>
            <small className="text-muted">per tweet</small>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card bg-light h-100">
          <div className="card-body text-center">
            <h6 className="card-title text-muted">Dominant Sentiment</h6>
            <h3 className={
              dominantSentiment.sentiment === 'POSITIVE' ? 'text-success' :
              dominantSentiment.sentiment === 'NEGATIVE' ? 'text-danger' : 'text-warning'
            }>
              {dominantSentiment.sentiment}
            </h3>
            <small className="text-muted">
              {dominantSentiment.percentage.toFixed(1)}%
            </small>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card bg-light h-100">
          <div className="card-body text-center">
            <h6 className="card-title text-muted">Total Engagement</h6>
            <h3 className="text-info">
              {((engagement_metrics?.total_retweets || 0) + (engagement_metrics?.total_likes || 0)).toLocaleString()}
            </h3>
            <small className="text-muted">retweets + likes</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetrics;