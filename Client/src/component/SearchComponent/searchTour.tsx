import React from 'react'
import Search from './searchOnly'
import { useNavigate } from 'react-router'

const SearchTour = () => {
  const navigate = useNavigate();

  return (
       <div className="w-full max-w-6xl">
      <Search onChange={(value: string) => { } } onSearch={() => {navigate("/Tours") } } placeHolder={'Search tour'} value={''}/>
    </div>
  )
}

export default SearchTour