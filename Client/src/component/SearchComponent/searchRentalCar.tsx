import React, { useEffect, useState } from "react";
import { Button, InputBar } from "../UI";
import Passengers from "../SelectComponent/PassengersRentalCar";
import {CalendarRentalCar} from "../../component"
import { useNavigate } from "react-router-dom";


const SearchRental=()=>{
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center gap-2 w-fit max-w-6xl">
        <InputBar onChange={()=>{}} placeholder={''}/>
        <CalendarRentalCar />
        <Passengers />
      <Button
        className="p-4 w-[150px] max-lg:w-3/4 max-xl:w-8/10 max-2xl:w-11/12"
        onClick={() => {
          navigate("/rentalcar");
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchRental;
