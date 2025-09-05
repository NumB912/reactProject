import React from "react";
import Search from "./searchOnly";
import { useNavigate } from "react-router";

const SearchHotel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl">
      <Search
        placeHolder={"Tìm kiếm khách sạn..."}
        value={""}
        
        onSearch={() => {
          navigate("/Hotels/");
        }}
        onChange={()=>{

        }}
      />
    </div>
  );
};

export default SearchHotel;
