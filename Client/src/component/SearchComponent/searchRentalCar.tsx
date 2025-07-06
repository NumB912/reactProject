import React, { useEffect, useState } from "react";
import { Button } from "../UI";
import Passengers from "../SelectComponent/PassengersRentalCar";
import {CalendarRentalCar} from "../../component"
import { useNavigate } from "react-router-dom";

function SearchRental() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap w-8/10">
      <div className="flex gap-2 max-lg:w-3/4 flex-wrap max-xl:w-8/10">
        <div className="relative w-[300px] max-lg:w-full max-xl:w-full h-full flex justify-center items-center">
          <i className="fa-solid fa-plane-arrival absolute left-6"></i>
          <input
            type="text"
            placeholder={"rentalcar"}
            className="m-auto border border-gray-300 shadow-md rounded-md w-full p-4
                 max-sm:border-b
                 max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
          />
        </div>
      </div>

      <div className="gap-2 relative flex items-center max-lg:flex-wrap max-lg:justify-center *:gap-3 max-lg:w-3/4 max-xl:w-8/10 ">
        <CalendarRentalCar />
        <Passengers />
      </div>

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
