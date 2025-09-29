import React from 'react';

import TopBar from '../components/TopBar';
import StatsCards from '../components/StatsCards';
import ChartsSection from '../components/ChartsSection';
import UploadStatistics from '../components/UploadStatistics';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <main className="flex-1 p-6 overflow-auto">
        <TopBar/>
        <StatsCards />
        <ChartsSection />
        <UploadStatistics />
      </main>
    </div>
  );
}