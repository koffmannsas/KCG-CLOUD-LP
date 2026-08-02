import React from 'react';
import MegaNav from '../navigation/MegaNav';
import MegaFooter from '../navigation/MegaFooter';
import Sidebar from '../navigation/Sidebar';
import Breadcrumb from '../navigation/Breadcrumb';
import { Outlet } from 'react-router-dom';

export default function EnterpriseLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white selection:bg-kcg-red selection:text-white">
      <MegaNav />
      <Sidebar />
      <main className="flex-grow pt-12 px-6 max-w-[1440px] mx-auto w-full">
        <Breadcrumb />
        <Outlet />
      </main>
      <MegaFooter />
    </div>
  );
}
