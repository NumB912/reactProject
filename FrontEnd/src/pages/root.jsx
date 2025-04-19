import React from 'react'
import NavBar from '../component/NavBar'
import { Outlet } from 'react-router'
import SearchBar from '../component/SearchBar'
import Banner from '../component/Banner'
const Root = () => {
  return (

    <>
        <div className='flex flex-col justify-center items-center w-screen'>
            <NavBar/>
            <Banner/>
            <Outlet/> 
        </div>
    </>
  )
}

export default Root