import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, InputBar } from '../UI'

interface SearchProp{
  placeHolder:string,
  value:string,
  onSearch:()=>void;
  onChange:(value:string)=>void;
}

const Search = ({onChange,onSearch,placeHolder}:SearchProp) => {
  return (
     <div className="flex justify-center items-center w-full relative max-sm:flex-wrap max-sm:border max-sm:border-gray-200 max-sm:shadow max-sm:p-5 max-sm:rounded-2xl">
            <div className="relative w-full h-full flex justify-center items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-6"></i>
              <InputBar placeholder={placeHolder} onChange={onChange}/>
            </div>
            <Button onClick={onSearch}
              className="rounded-full w-35 absolute bg-black text-white font-bold right-2
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