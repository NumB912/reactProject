import React, { useEffect, useState } from "react";
import { Button, InputBar } from "../UI";
import Passengers from "../passenger-content/PassengersRentalCar";
import {CalendarRentalCar} from "../../component"
import { useNavigate } from "react-router-dom";

const SearchRental=()=>{
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center gap-2 max-xl:flex-wrap w-full max-w-6xl">
        <InputBar onChange={()=>{}} placeholder={'Tìm kiếm nơi thuê xe'} variant="outline" rounded="full"/>
        <div className="w-fit max-xl:w-full"><CalendarRentalCar /></div>
        <div className="w-fit max-xl:w-full"><Passengers /></div>
      <Button
        className="font-bold w-full min-xl:max-w-[200px] h-full"
        onClick={() => {
          navigate("/rentalcar");
        }}
        rounded="full"
        variant="primary"
        type="button"
      >
        Tìm kiếm
      </Button>
    </div>
  );
}

export default SearchRental;
