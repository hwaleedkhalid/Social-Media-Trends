// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
          Social Media Trends Dashboard
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium">
          Choose a platform to explore trending topics in real time.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Twitter Card */}
        <Link
          to="/twitter"
          className="flex-1 block transform transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl shadow-lg hover:shadow-xl"
        >
          <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-center h-full">
            <div className="text-blue-500 mb-4">
              {/* Twitter Icon - A simplified bird shape */}
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.35c-4.66 0-7.79-3.41-7.79-7.39 0-.11 0-.22.01-.33a5.53 5.53 0 011.63-1.89c-.58.05-1.16.14-1.72.33 0 0-.01 0-.02 0a5.1 5.1 0 002.3 2.87 5.1 5.1 0 01-1.42.19c-.58 0-1.15-.06-1.7-.2a5.1 5.1 0 002.13 2.05 6.07 6.07 0 01-3.63 1.25c-.23 0-.46-.01-.69-.02a11.97 11.97 0 006.49 1.9c7.79 0 12.06-6.4 12.06-12.05 0-.18 0-.36-.01-.54A8.73 8.73 0 0022 4.67a8.73 8.73 0 01-2.52.69 4.37 4.37 0 001.91-2.44 8.73 8.73 0 01-2.78 1.06 4.36 4.36 0 00-7.44 3.98 12.33 12.33 0 01-8.94-4.52 4.36 4.36 0 001.35 5.83 4.34 4.34 0 01-1.97-.54c0 .01 0 .02 0 .03a4.36 4.36 0 003.5 4.27 4.37 4.37 0 01-1.97.07 4.36 4.36 0 004.07 3.03z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore Twitter Trends</h2>
            <p className="text-gray-600 text-lg text-center">See what's hot on Twitter right now.</p>
          </div>
        </Link>

        {/* Reddit Card */}
        <Link
          to="/reddit"
          className="flex-1 block transform transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-xl shadow-lg hover:shadow-xl"
        >
          <div className="bg-white p-8 rounded-xl flex flex-col items-center justify-center h-full">
            <div className="text-red-500 mb-4">
              {/* Reddit Icon - A simplified alien head */}
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 10.43c0 1.25-.13 2.45-.37 3.61-.31 1.54-.88 2.96-1.68 4.24-1.28 2.02-3.13 3.63-5.32 4.79C12.35 23 8.41 23 5.4 21.07c-2.19-1.16-4.04-2.77-5.32-4.79-.8-.28-1.55-.95-1.68-4.24-.24-1.16-.37-2.36-.37-3.61 0-5.78 3.5-10.43 9.77-10.43 6.27 0 9.77 4.65 9.77 10.43zM12 2.82c-4.96 0-9 3.49-9 7.61 0 3.25 1.58 6.09 4.14 7.61C5.74 19.34 8.78 20 12 20s6.26-.66 7.86-1.96c2.56-1.52 4.14-4.36 4.14-7.61 0-4.12-4.04-7.61-9-7.61zM9.5 8c.83 0 1.5.67 1.5 1.5S10.33 11 9.5 11 8 10.33 8 9.5 8.67 8 9.5 8zm5 0c.83 0 1.5.67 1.5 1.5S15.33 11 14.5 11 13 10.33 13 9.5 13.67 8 14.5 8zM12 14c-1.93 0-3.5 1.79-3.5 4s1.57 4 3.5 4 3.5-1.79 3.5-4-1.57-4-3.5-4z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore Reddit Trends</h2>
            <p className="text-gray-600 text-lg text-center">Discover what's trending on Reddit.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;