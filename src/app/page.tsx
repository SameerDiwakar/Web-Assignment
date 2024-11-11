import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopCards from './components/TopCards';
import BarChart from './components/BarChart';
import RecentOrders from './components/RecentOrders';

export default function Home() {
  return (
    <div>
       <main className='bg-gray-100 min-h-screen'>
        <Sidebar>
        <Header />
          <div>
        <TopCards />
          </div>
        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
          <BarChart />
          <RecentOrders />
        </div>
        </Sidebar>
      </main>
    </div>
  );
}
