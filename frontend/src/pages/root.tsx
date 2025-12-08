import React from 'react'
import NavBar from '../component/navigation-bar/NavBar'
import { Outlet } from 'react-router'
import { Footer } from '../component'
import useStateLogin from '../store/LoginStore/login_store';



const Root = () => {
  
  return (
    <div className="h-screen flex flex-col items-center font-sans bg-white">
           <NavBar />
      <div className="flex-1 w-full flex-col flex items-center pb-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}; 


export default Root