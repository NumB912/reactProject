import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {logo} from '../../assets/'
import { Button } from '../ButtonComponent/Button';
interface SearchAllProps {
  typeSearch: string;
}

const SearchAll: React.FC<SearchAllProps> = ({ typeSearch }) => {
  const navigate = useNavigate();
  const [focus,setFocus] = useState(false)
  const [tour,setTour] = useState("")

  const [destination,setDestination] = useState("")
  const HandleTour = ()=>{

  }


  return (
     <div className="flex justify-center items-center w-full relative max-sm:flex-wrap max-sm:border max-sm:border-gray-200 max-sm:shadow max-sm:p-5 max-sm:rounded-2xl max-sm:w-11/12 min-lg:w-8/12">
            <div className="relative w-full h-full flex justify-center items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-6"></i>
              <input
                type="text"
                placeholder={"Search by destination"}
                className="m-auto border border-gray-300 shadow-md rounded-full w-full p-4
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
            <Button
              onClick={() => {
                navigate(`/${typeSearch=="Tour"?"Tours":typeSearch=="Hotels"?"Hotels":""}`);
              }}
              className="rounded-full w-35 h-8/10 absolute bg-black text-white font-bold right-2
               hover:scale-95
             hover:bg-black
              transition-all
              duration-300
              ease-in-out
              max-sm:w-full
              max-sm:relative
              max-sm:mt-2
              max-sm:p-2
              max-sm:right-0
            "
            >
              Search
            </Button>
          </div>
  )
}

export default SearchAll