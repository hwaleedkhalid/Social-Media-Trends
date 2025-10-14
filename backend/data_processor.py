from collections import defaultdict, deque
import re
from textblob import TextBlob
from datetime import datetime
import json

class DataProcessor:
    def __init__(self):
        self.reset()
        self.keyword_metrics = {}
        
    def reset(self):
        self.tweet_count = 0
        self.sentiment_counts = {'positive': 0, 'negative': 0, 'neutral': 0}
        self.hashtag_counts = defaultdict(int)
        self.tweet_volume = deque(maxlen=30)
        self.recent_tweets = deque(maxlen=8)
        self.last_update = datetime.now()
        self.engagement_metrics = {
            'total_retweets': 0,
            'total_likes': 0,
            'avg_engagement': 0
        }
    
    def analyze_sentiment(self, text):
        """Simple sentiment analysis using TextBlob"""
        try:
            analysis = TextBlob(text)
            polarity = analysis.sentiment.polarity
            
            if polarity > 0.1:
                return 'positive'
            elif polarity < -0.1:
                return 'negative'
            else:
                return 'neutral'
        except:
            return 'neutral'
    
    def extract_hashtags(self, text):
        """Extract hashtags from tweet text"""
        return re.findall(r'#\w+', text.lower())
    
    def process_tweet(self, tweet_data):
        """Process incoming tweet and update metrics"""
        self.tweet_count += 1
        text = tweet_data.get('text', '')
        
        # Analyze sentiment
        sentiment = self.analyze_sentiment(text)
        self.sentiment_counts[sentiment] += 1
        
        # Update engagement metrics
        retweets = tweet_data.get('retweet_count', 0)
        likes = tweet_data.get('favorite_count', 0)
        self.engagement_metrics['total_retweets'] += retweets
        self.engagement_metrics['total_likes'] += likes
        
        # Calculate average engagement
        if self.tweet_count > 0:
            total_engagement = self.engagement_metrics['total_retweets'] + self.engagement_metrics['total_likes']
            self.engagement_metrics['avg_engagement'] = total_engagement / self.tweet_count
        
        
        # Extract and count hashtags
        hashtags = self.extract_hashtags(text)
        for hashtag in hashtags:
            self.hashtag_counts[hashtag] += 1
        
        # Update tweet volume
        current_time = datetime.now()
        self.tweet_volume.append({
            'time': current_time.strftime('%H:%M:%S'),
            'count': 1,
            'timestamp': current_time.isoformat()
        })
        
        # Add to recent tweets
        self.recent_tweets.append({
            'id': tweet_data.get('id', self.tweet_count),
            'user': tweet_data.get('user', 'Unknown'),
            'text': text[:100] + '...' if len(text) > 100 else text,
            'sentiment': sentiment,
            'time': current_time.strftime('%H:%M:%S'),
            'full_text': text
        })
        
        self.last_update = current_time
    
def get_dashboard_data(self):
    """Get current dashboard state"""
    # Get top 8 hashtags
    top_hashtags = dict(sorted(
        self.hashtag_counts.items(), 
        key=lambda x: x[1], 
        reverse=True
    )[:8])
    
    return {
        'total_tweets': self.tweet_count,
        'sentiment_distribution': self.sentiment_counts.copy(),
        'hashtag_counts': top_hashtags,
        'tweet_volume': list(self.tweet_volume),
        'recent_tweets': list(self.recent_tweets),
        'engagement_metrics': {
            'total_retweets': self.engagement_metrics['total_retweets'],
            'total_likes': self.engagement_metrics['total_likes'],
            'avg_engagement': self.engagement_metrics['avg_engagement']
        },
        'last_update': self.last_update.isoformat()
    }

    def get_advanced_metrics(self):
        """Get advanced analytics"""
        sentiment_total = sum(self.sentiment_counts.values())
        sentiment_percentages = {
            sentiment: (count / sentiment_total * 100) if sentiment_total > 0 else 0
            for sentiment, count in self.sentiment_counts.items()
        }
        
        return {
            'sentiment_percentages': sentiment_percentages,
            'engagement_metrics': self.engagement_metrics,
            'tweets_per_minute': self._calculate_tpm(),
            'dominant_sentiment': max(self.sentiment_counts.items(), key=lambda x: x[1])[0] if sentiment_total > 0 else 'neutral'
        }
    
    def _calculate_tpm(self):
        """Calculate tweets per minute (simplified)"""
        if len(self.tweet_volume) < 2:
            return 0
        
        recent_tweets = list(self.tweet_volume)[-10:]  # Last 10 data points
        return len(recent_tweets) / 2  # Rough estimate