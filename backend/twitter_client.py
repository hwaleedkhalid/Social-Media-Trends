import threading
import random
import time
from datetime import datetime
import asyncio

class TwitterClient:
    def __init__(self):
        self.is_streaming = False
        self.current_keyword = ""
    
    def start_streaming(self, keyword, data_processor, connection_manager):
        """Start mock tweet streaming"""
        self.is_streaming = True
        self.current_keyword = keyword
        
        # Reset data processor for new stream
        data_processor.reset()
        
        # Start mock streaming in background thread
        thread = threading.Thread(
            target=self._mock_streaming_worker, 
            args=(keyword, data_processor, connection_manager)
        )
        thread.daemon = True
        thread.start()
    
    def _mock_streaming_worker(self, keyword, data_processor, connection_manager):
        """Worker thread that generates mock tweet data"""
        # Mock data configurations
        mock_users = [
            'tech_enthusiast', 'ai_researcher', 'web_dev', 'data_scientist',
            'startup_founder', 'digital_nomad', 'code_guru', 'tech_news'
        ]
        
        mock_hashtags = [
            'tech', 'ai', 'python', 'javascript', 'webdev', 'coding',
            'machinelearning', 'datascience', 'innovation', 'technology'
        ]
        
        sentiment_templates = {
            'positive': [
                f"Loving the new developments in {keyword}! 🚀",
                f"{keyword} is changing the game! So excited about this.",
                f"Amazing progress in {keyword} recently. The future is bright!",
                f"Just implemented {keyword} in my project and it's fantastic!",
                f"{keyword} is revolutionizing the industry! 🔥"
            ],
            'neutral': [
                f"Reading about {keyword} developments. Interesting stuff.",
                f"Current trends in {keyword} show steady growth.",
                f"Analysis of {keyword} market share shows interesting patterns.",
                f"Discussion about {keyword} implementation strategies.",
                f"Research paper on {keyword} applications published today."
            ],
            'negative': [
                f"Concerned about the ethical implications of {keyword}.",
                f"Having issues with {keyword} implementation. So frustrating!",
                f"{keyword} adoption facing significant challenges recently.",
                f"Security vulnerabilities found in {keyword} systems.",
                f"Overhyped expectations for {keyword} not being met."
            ]
        }
        
        print(f"Starting mock streaming for keyword: {keyword}")
        
        while self.is_streaming:
            try:
                # Random delay between tweets (0.5 to 3 seconds)
                time.sleep(random.uniform(0.5, 2.0))
                
                # Randomly select sentiment
                sentiment = random.choices(
                    ['positive', 'neutral', 'negative'],
                    weights=[0.4, 0.3, 0.3]
                )[0]
                
                # Generate mock tweet
                template = random.choice(sentiment_templates[sentiment])
                tweet_text = template
                
                # Add some hashtags
                num_hashtags = random.randint(1, 3)
                additional_hashtags = random.sample(mock_hashtags, num_hashtags)
                for hashtag in additional_hashtags:
                    if hashtag != keyword.lower():
                        tweet_text += f" #{hashtag}"
                
                mock_tweet = {
                    'id': random.randint(100000, 999999),
                    'text': tweet_text,
                    'user': random.choice(mock_users),
                    'created_at': datetime.now().isoformat(),
                    'retweet_count': random.randint(0, 50),
                    'favorite_count': random.randint(0, 100)
                }
                
                # Process the tweet
                data_processor.process_tweet(mock_tweet)
                
                print(f"Processed mock tweet: {tweet_text[:50]}...")
                
            except Exception as e:
                print(f"Error in mock streaming: {e}")
                break
        
        print("Mock streaming stopped")

    def stop_streaming(self):
        """Stop the streaming"""
        self.is_streaming = False