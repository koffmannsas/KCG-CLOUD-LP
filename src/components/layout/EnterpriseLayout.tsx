import React from 'react';
import MegaNav from '../navigation/MegaNav';
import MegaFooter from '../navigation/MegaFooter';
import Sidebar from '../navigation/Sidebar';
import { Outlet } from 'react-router-dom';

export default function EnterpriseLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white selection:bg-kcg-red selection:text-white">
      <MegaNav />
      <Sidebar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MegaFooter />
    </div>
  );
}
