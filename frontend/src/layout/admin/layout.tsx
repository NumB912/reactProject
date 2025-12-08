'use client';

import React, { useState } from 'react';
import { NavBar } from '../../component';
import { Outlet } from 'react-router';
import SideBar from '../../component/admin/sideBar';
import Header from '../../component/admin/header';

interface AdminLayoutProp{
  children:React.ReactNode
}

export default function AdminLayout({children}:AdminLayoutProp) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setSidebarOpen={setSidebarOpen} sideBarOpen={sidebarOpen}/>
      <div className="flex">
        <SideBar setSidebarOpen={setSidebarOpen} sideBarOpen={sidebarOpen}/>
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div>
          {children}
          </div>
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}