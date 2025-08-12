import React, { useEffect, useState } from "react";
import { Button, InputBar } from "../UI";
import Passengers from "../PassengerComponent/PassengersRentalCar";
import {CalendarRentalCar} from "../../component"
import { useNavigate } from "react-router-dom";

const SearchRental=()=>{
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center gap-2 w-fit max-w-6xl max-xl:flex-wrap">
        <InputBar onChange={()=>{}} placeholder={''}/>
        <div className="w-fit max-xl:w-full"><CalendarRentalCar /></div>
        <div className="w-fit max-xl:w-full"><Passengers /></div>
      <Button
        className="w-fit max-xl:w-full font-bold"
        onClick={() => {
          navigate("/rentalcar");
        }}
        rounded="full"
        variant="primary"
      >
        Search
      </Button>
    </div>
  );
}

export default SearchRental;
