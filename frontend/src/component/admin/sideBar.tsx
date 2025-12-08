import { Bell, CheckSquare, Home, LogOut, Menu, Package, Search, SidebarOpen, UserCheck, Users, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router';

interface sideBarProp{
    sideBarOpen:boolean;
    setSidebarOpen:(sideBarOpen:boolean)=>void
}

const SideBar = ({sideBarOpen,setSidebarOpen}:sideBarProp) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
    
      const menuItems = [
        { id: 'admin/dashboard', name: 'Tổng quan', icon: <Home size={20} /> },
        { id: 'admin/users', name: 'Quản lý người dùng', icon: <Users size={20} /> },
        { id: 'admin/suppliers', name: 'Quản lý nhà cung cấp', icon: <Package size={20} /> },
        { id: 'admin/services', name: 'Quản lý dịch vụ NCC', icon: <CheckSquare size={20} /> },
        { id: 'admin/approvals', name: 'Xét duyệt yêu cầu', icon: <UserCheck size={20} /> },
      ];
    

  return (
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
            sideBarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
          }`}
        >
          <nav className="h-full flex flex-col">
            <ul className="flex-1 py-4 overflow-y-auto">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/${item.id}`}
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex items-center space-x-3 px-6 py-3 transition-colors ${
                      activeMenu === item.id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Hệ thống đang hoạt động</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Phiên bản 1.0.0
              </div>
            </div>
          </nav>
        </aside>
  )
}

export default SideBar