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
        { id: 'supplier/services', name: 'Quản lý dịch vụ', icon: <CheckSquare size={20} /> },
        {
          id:'supplier/serviceItems',name:'Quản lý sản phẩm',icon:<CheckSquare size={20} />},
        
         { id: 'supplier/bookings', name: 'Quản lý booking', icon: <CheckSquare size={20} /> }
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

          </nav>
        </aside>
  )
}

export default SideBar