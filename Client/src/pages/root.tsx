import React from 'react'
import NavBar from '../component/NavBarComponent/NavBar'
import { Outlet } from 'react-router'
import { Footer } from '../component'

const Root = () => {
  return (

    <>
        <div className='flex flex-col justify-center items-center font-sans bg-white'>
              <NavBar/>
              <Outlet/>
              <Footer/>
        </div>
    </>
  )
}

export default Root