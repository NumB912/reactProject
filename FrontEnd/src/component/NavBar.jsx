import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/src/assets/logo.png';
import './styles/style_nav.css'
const NavBar = () => {

  const [isShow,setShow] = useState(false)


  return (
    <>

<div className='w-screen h-fit flex justify-center items-center bg-white shadow-md sticky top-0 z-10 *:text-sm max-sm:hidden '>
        <div className='w-3/12 max-sm:hidden'>
          <img src={logo} alt="Logo" className='w-20 m-auto'/>
        </div>
        <div className='p-2 flex gap-2 justify-center items-center w-6/12 *:p-2'>
          <Link to="/home" className='hover:bg-gray-200 p-3 rounded-md'>Home</Link>
          <Link to="/about" className='hover:bg-gray-200 p-3 rounded-md'>About</Link>
          <Link to="/services" className='hover:bg-gray-200 p-3 rounded-md'>Services</Link>
          <Link to="/contact" className='hover:bg-gray-200 p-3 rounded-md'>Contact</Link>
        </div>
        <div className='h-full flex items-center justify-between w-3/12 max-sm:hidden max-sm:4/12'>
            <img className='object-cover w-10 h-10 rounded-full border border-gray-500 hidden' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bocchi_the_Rock%21_logo.svg/512px-Bocchi_the_Rock%21_logo.svg.png" alt="User Profile" />
            <span className='userName hidden'>Username</span>
            <div className="signLog rounded-4xl flex items-center justify-center w-full *:rounded-4xl *:max-w-20 *:p-2 gap-1 *:text-sm">
            <Link className='hidden p-2 rounded-4xl hover:bg-gray-700'>Logout</Link>
            <Link className=' bg-blue-700 text-center w-1/2
             hover:scale-90
             hover:bg-blue-800
              transition-all
              duration-300
              ease-in-out
            text-white
              font-bold
             '>
                Sign up
            </Link>
            <Link className=' bg-blue-700 text-center w-1/2
             hover:scale-90
             hover:bg-blue-800
              transition-all
              duration-300
              ease-in-out
            text-white
              font-bold
             '>
                Log in
            </Link>
            </div>
        </div>
    </div>

    <div className='w-screen h-fit justify-center items-center bg-white shadow-md sticky top-0 z-10 *:text-sm max-sm:flex hidden *:px-2'>
        
        <Link className='w-2/12 text-center h-full' onClick={()=>{setShow(!isShow)}}><i class="fa-solid fa-bars h-full"></i></Link>
 
        <div className={`w-3/4 max-[400px]:w-full absolute bg-white h-screen flex-col *:text-black *:text-[13px] top-[0px] shadow-2xl pt-10 pr-10 
          transition-[left] ease-in duration-300 ${isShow ? "left-0" : "left-[-100%]"}`}>

          <button className='absolute right-0 p-3.5 top-0 hover:bg-gray-200' onClick={()=>{setShow(!isShow)}}><i class="fa-solid fa-x"></i></button>
          <div className='flex w-full flex-col border-t border-gray-200 my-1.5'>
              <Link to="/home" className='hover:bg-gray-200 p-4'>Home</Link>
              <Link to="/about" className='hover:bg-gray-200 p-4'>About</Link>
              <Link to="/services" className='hover:bg-gray-200 p-4'>Services</Link>
              <Link to="/contact" className='hover:bg-gray-200 p-4'>Contact</Link>
          </div>
        </div>

        <div className='w-8/12 m-auto flex justify-center'>
          <img src={logo} alt="Logo" className='w-35'/>
        </div>

        <Link className='w-2/12 text-center h-full'>
        <i class="fa-solid fa-user"></i>
        </Link>

    </div>

    </>

    

  )
}

export default NavBar