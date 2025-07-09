import React from "react";
import { usePassengerCar,useCalendarCarStore } from "../../store";
import PassengerWrap from "./PassengersWrap";
import { DropDown } from "..";
import DropDownOutLineItem from "../DropDownComponent/DropDownOutLineItem";

const Passengers = () => {
  const {
    setNumberPassenger,
    numberPassengerOptions,
    setIsSelectedPassenger,
    isSelectedPassenger,
    numberPassenger,
  } = usePassengerCar();
  const { setIsDateSelectedDropOff, setIsDateSelectedPickUp } =
    useCalendarCarStore();

  return (
    <PassengerWrap styleContainer=" w-full rounded-sm h-full">
      <DropDownOutLineItem handleOnClick={()=>{        
        setIsSelectedPassenger(!isSelectedPassenger);
        setIsDateSelectedPickUp(false);
        setIsDateSelectedDropOff(false);}}>
      <i className="fa-solid fa-users"></i>
      <div className="RAG flex flex-col justify-center items-start">
        <p className="text-[10px] font-semibold">Passenger</p>
        <p className="text-[13px] font-bold min-w-23">
          {" "}
          {numberPassenger == "1"
            ? `${numberPassenger} passenger`
            : numberPassenger == "Select"
            ? `Select`
            : `${numberPassenger} passengers`}
        </p>
      </div>
      <div
        className={`bg-white w-full absolute left-0 top-15 border border-gray-300 z-10 rounded-sm ${
          isSelectedPassenger ? "" : "hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="passengers w-full">
          <div className="flex flex-col text-center overflow-hidden shadow-md">
            {numberPassengerOptions.map((label: string, index) => (
              <div
                key={index}
                className={`p-3 hover:bg-gray-200 cursor-pointer`}
                onClick={() => {
                  setNumberPassenger(label);
                  setIsSelectedPassenger(!isSelectedPassenger)
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      </DropDownOutLineItem>
    </PassengerWrap>

  );
};

export default Passengers;
