import React from "react";
import Search from "./searchOnly";
import { useNavigate } from "react-router";

const SearchHotel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl">
      <Search placeHolder={"Search hotel.."} value={""} onSearch={()=>{navigate("/Hotels/")} } onChange={function (value: string): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};

export default SearchHotel;
