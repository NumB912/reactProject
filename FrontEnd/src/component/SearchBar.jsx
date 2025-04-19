import React from 'react'

const SearchBar = () => {

  return (
  <>
    <div className='flex w-full h-2/12 flex-col justify-center items-center my-3 bg-white z-0 max-sm:mt-[-30px]'>
    <h1 className='text-[3vw] font-bold text-center m-4 max-sm:hidden'>What do you want to do today?</h1>
        <div className='flex justify-center items-center w-full m-3 h-full *:hover:bg-gray-200 *:p-3 *:m-0 *:rounded-4xl *:max-sm:text-sm '>
            <div className="item"><i class="fa-solid fa-border-all mr-2"></i> Search all</div>
            <div className="item"><i class="fa-solid fa-hotel mr-2"></i> Hotels</div>
            <div className="item"><i class="fa-solid fa-location-dot mr-2"></i>Tour</div>
            <div className="item"><i class="fa-solid fa-plane mr-2"></i> Flights</div>
            <div className="item"><i class="fa-solid fa-car mr-2"></i>  Rental car</div>
        </div>        
        <div className='flex justify-center items-center w-8/12 relative max-sm:flex-wrap max-sm:border max-sm:border-gray-200 max-sm:shadow max-sm:p-5 max-sm:rounded-2xl max-sm:w-11/12 min-lg:w-8/12'>
            <div className="relative w-full h-full flex justify-center items-center">
                <i className="fa-solid fa-magnifying-glass absolute left-6 z-1"></i>
                <input type="text" placeholder="Search..." className="m-auto border-gray-200 shadow rounded-full w-full placeholder:italic p-4 max-sm:border-b max-sm:shadow-none max-sm:rounded-none max-sm:p-2 max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:border-b max-sm:focus:outline-0" />
            </div>
            <button 
            className='rounded-full w-35 h-8/10 absolute bg-blue-700 text-white font-bold right-2
               hover:scale-95
             hover:bg-blue-800
              transition-all
              duration-300
              ease-in-out
              max-sm:w-full
              max-sm:relative
              max-sm:mt-2
              max-sm:p-2
              max-sm:right-0
            '>Search</button>  
        </div>
    </div>
 
  </>
   
  )
}

export default SearchBar