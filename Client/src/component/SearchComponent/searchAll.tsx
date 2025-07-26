import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, InputBar } from '../UI'
interface SearchAllProps {
  typeSearch: string;
}

const Search: React.FC<SearchAllProps> = ({ typeSearch }) => {
  const navigate = useNavigate();
  const [focus,setFocus] = useState(false)
  const [tour,setTour] = useState("")


  return (
     <div className="flex justify-center items-center w-full relative max-sm:flex-wrap max-sm:border max-sm:border-gray-200 max-sm:shadow max-sm:p-5 max-sm:rounded-2xl max-sm:w-11/12 min-lg:w-8/12">
            <div className="relative w-full h-full flex justify-center items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-6"></i>
              <InputBar/>
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

export default Search