import React, { useState } from 'react'

const InputBar = () => {
    const [focus,setFocus] = useState(false)
    return (
            <div className="relative w-8/10 flex justify-center items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-6"></i>
              <input
                type="text"
                placeholder={"Search by destination"}
                className="m-auto border bg-white border-gray-300 shadow-md rounded-full w-full p-4
              max-sm:border-b max-sm:shadow-none max-sm:rounded-none max-sm:p-2
              max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
              onFocus={()=>{setFocus(true)}}
              />

              <div className={`left-1/2 border border-gray-300 z-40 rounded-2xl top-17 -translate-x-1/2  w-full p-3 bg-white absolute flex flex-col ${focus?"":"hidden"}`}>

                  <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hồ chí minh city</p>
                  </div>

                    <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hà nội</p>
                  </div>

        <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hồ chí minh city</p>
                  </div>

                    <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hà nội</p>
                  </div>
                    <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hồ chí minh city</p>
                  </div>

                    <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hà nội</p>
                  </div>
                    <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hồ chí minh city</p>
                  </div>

                    <div className='hover:bg-gray-200 w-full p-5 flex' onClick={()=>{setFocus(false)}}>
                    <p>Hà nội</p>
                  </div>
              </div>
            </div>
    )
}

export default InputBar