from collections import defaultdict, deque
import re
from textblob import TextBlob
from datetime import datetime
import json

class DataProcessor:
    def __init__(self):
        self.reset()
        
    def reset(self):
        self.tweet_count = 0
        self.sentiment_counts = {'positive': 0, 'negative': 0, 'neutral': 0}
        self.hashtag_counts = defaultdict(int)
        self.tweet_volume = deque(maxlen=30)
        self.recent_tweets = deque(maxlen=8)
        self.last_update = datetime.now()
    
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
            'last_update': self.last_update.isoformat()
        }