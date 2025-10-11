import React, { useState, useEffect } from 'react';
import socketService from '../services/socketService';
import MetricsCards from './MetricsCards';
import Controls from './Controls';
import RecentTweets from './RecentTweets';
import SentimentChart from './Charts/SentimentChart';
import HashtagsChart from './Charts/HashtagsChart';
import VolumeChart from './Charts/VolumeChart';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_tweets: 0,
    sentiment_distribution: { positive: 0, negative: 0, neutral: 0 },
    hashtag_counts: {},
    tweet_volume: [],
    recent_tweets: []
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState('');

  useEffect(() => {
    // Initialize socket connection
    const socket = socketService.connect();

    // Set up event listeners
    socketService.onConnect(() => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socketService.onDisconnect(() => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setIsStreaming(false);
    });

    socketService.onDataUpdate((data) => {
      setDashboardData(data);
    });

    // Clean up on component unmount
    return () => {
      socketService.removeAllListeners();
      socketService.disconnect();
    };
  }, []);

  const handleStartStreaming = async (keyword) => {
    if (!isConnected) return;

    try {
      const response = await fetch(`http://localhost:5000/api/start-streaming/${encodeURIComponent(keyword)}`);
      const result = await response.json();
      
      if (response.ok) {
        setIsStreaming(true);
        setCurrentKeyword(keyword);
        console.log('Streaming started:', result);
      } else {
        console.error('Failed to start streaming:', result.error);
      }
    } catch (error) {
      console.error('Error starting streaming:', error);
    }
  };

  const handleStopStreaming = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stop-streaming');
      const result = await response.json();
      
      if (response.ok) {
        setIsStreaming(false);
        setCurrentKeyword('');
        console.log('Streaming stopped:', result);
      }
    } catch (error) {
      console.error('Error stopping streaming:', error);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="row bg-dark text-white p-3 mb-4">
        <div className="col">
          <div className="d-flex align-items-center">
            <i className="fas fa-chart-line fa-2x me-3"></i>
            <div>
              <h1 className="h3 mb-0">📊 Social Media Dashboard</h1>
              <p className="mb-0 opacity-75">Real-time analytics for social media trends</p>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <Controls
        isConnected={isConnected}
        isStreaming={isStreaming}
        currentKeyword={currentKeyword}
        onStartStreaming={handleStartStreaming}
        onStopStreaming={handleStopStreaming}
      />

      {/* Metrics Cards */}
      <MetricsCards data={dashboardData} />

      {/* Charts Row 1 */}
      <div className="row mt-4">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="fas fa-smile me-2"></i>
                Sentiment Analysis
              </h5>
            </div>
            <div className="card-body">
              <SentimentChart data={dashboardData.sentiment_distribution} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="fas fa-hashtag me-2"></i>
                Popular Hashtags
              </h5>
            </div>
            <div className="card-body">
              <HashtagsChart data={dashboardData.hashtag_counts} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="row mt-4">
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2"></i>
                Tweet Volume Over Time
              </h5>
            </div>
            <div className="card-body">
              <VolumeChart data={dashboardData.tweet_volume} />
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <RecentTweets tweets={dashboardData.recent_tweets} />
        </div>
      </div>

      {/* Footer */}
      <footer className="row mt-5 mb-3">
        <div className="col text-center text-muted">
          <small>
            Real-time Social Media Dashboard • Built with React & Flask • 
            Total Tweets Processed: <strong>{dashboardData.total_tweets}</strong>
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;