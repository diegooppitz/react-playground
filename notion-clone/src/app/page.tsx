"use client";
import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const Home = () => {
  return (
    <div className="notion-app">
      <Sidebar />
      <MainContent isHome={true} />
    </div>
  );
};

export default Home;