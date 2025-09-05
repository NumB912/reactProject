import React from 'react'
import { useNavigate } from 'react-router';
import Search from './searchOnly';

const SearchAll = () => {
   const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl">
      <Search placeHolder={"Tìm kiếm dịch vụ mà bạn muốn..."} value={""} onSearch={()=>{navigate("/Hotels/")} } onChange={function (value: string): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
}

export default SearchAll