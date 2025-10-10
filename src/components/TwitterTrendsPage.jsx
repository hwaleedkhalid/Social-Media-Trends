// src/components/TwitterTrendsPage.jsx
import React from 'react';
import Header from "./Header";
import DashboardGrid from "./DashboardGrid";

const TwitterTrendsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Header />
      <DashboardGrid />
    </div>
  );
};

export default TwitterTrendsPage;
