import threading
import random
import time
from datetime import datetime
import asyncio
import os
import tweepy
from dotenv import load_dotenv

load_dotenv()

class TwitterClient:
    def __init__(self):
        self.is_streaming = False
        self.current_keyword = ""
        self.bearer_token = os.getenv('TWITTER_BEARER_TOKEN')
        self.use_real_api = os.getenv('USE_REAL_TWITTER_API', 'false').lower() == 'true'
        self.stream = None
        
        # Initialize Tweepy client for real API
        if self.use_real_api and self.bearer_token:
            self.client = tweepy.Client(bearer_token=self.bearer_token)
            print("Twitter API client initialized with real credentials")
        else:
            self.client = None
            print("Twitter API client running in mock mode")
    
    def start_streaming(self, keyword, data_processor, connection_manager):
        """Start tweet streaming - real or mock based on configuration"""
        self.is_streaming = True
        self.current_keyword = keyword
        
        # Reset data processor for new stream
        data_processor.reset()
        
        if self.use_real_api and self.client:
            print(f"Starting REAL Twitter streaming for: {keyword}")
            self._start_real_streaming(keyword, data_processor, connection_manager)
        else:
            print(f"Starting MOCK Twitter streaming for: {keyword}")
            self._start_mock_streaming(keyword, data_processor, connection_manager)
    
    def _start_real_streaming(self, keyword, data_processor, connection_manager):
        """Start real Twitter API streaming"""
        # For real-time streaming, we'd use Twitter's filtered stream
        # But for simplicity, we'll use search recent tweets
        thread = threading.Thread(
            target=self._real_streaming_worker, 
            args=(keyword, data_processor, connection_manager)
        )
        thread.daemon = True
        thread.start()
    
    def _real_streaming_worker(self, keyword, data_processor, connection_manager):
        """Worker thread that fetches real tweets"""
        import requests
        import json
        
        headers = {
            "Authorization": f"Bearer {self.bearer_token}"
        }
        
        # Search recent tweets (last 7 days)
        search_url = "https://api.twitter.com/2/tweets/search/recent"
        
        while self.is_streaming:
            try:
                params = {
                    'query': f'{keyword} -is:retweet',
                    'max_results': 10,
                    'tweet.fields': 'created_at,public_metrics,author_id',
                    'user.fields': 'username',
                    'expansions': 'author_id'
                }
                
                response = requests.get(search_url, headers=headers, params=params)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    if 'data' in data:
                        # Process each tweet
                        users = {user['id']: user for user in data.get('includes', {}).get('users', [])}
                        
                        for tweet in data['data']:
                            user = users.get(tweet['author_id'], {})
                            username = user.get('username', 'unknown')
                            
                            tweet_data = {
                                'id': tweet['id'],
                                'text': tweet['text'],
                                'user': username,
                                'created_at': tweet.get('created_at', datetime.now().isoformat()),
                                'retweet_count': tweet.get('public_metrics', {}).get('retweet_count', 0),
                                'favorite_count': tweet.get('public_metrics', {}).get('like_count', 0)
                            }
                            
                            # Process the tweet
                            data_processor.process_tweet(tweet_data)
                            print(f"Processed real tweet from @{username}: {tweet['text'][:50]}...")
                
                # Wait before next search (respect rate limits)
                time.sleep(10)  # 6 requests per minute limit
                
            except Exception as e:
                print(f"Error in real Twitter streaming: {e}")
                time.sleep(30)  # Wait longer on errors
        
        print("Real Twitter streaming stopped")
    
    def _start_mock_streaming(self, keyword, data_processor, connection_manager):
        """Start mock tweet streaming"""
        thread = threading.Thread(
            target=self._mock_streaming_worker, 
            args=(keyword, data_processor, connection_manager)
        )
        thread.daemon = True
        thread.start()
    
    def _mock_streaming_worker(self, keyword, data_processor, connection_manager):
        """Worker thread that generates mock tweet data"""
        # ... (keep the existing mock streaming code from previous version)
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