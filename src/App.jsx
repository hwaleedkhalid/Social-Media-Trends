
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TwitterTrendsPage from './components/TwitterTrendsPage';
import RedditTrendsPage from './components/RedditTrendsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/twitter" element={<TwitterTrendsPage />} />
        <Route path="/reddit" element={<RedditTrendsPage />} />
      </Routes>
    </Router>
  );
}

export default App;