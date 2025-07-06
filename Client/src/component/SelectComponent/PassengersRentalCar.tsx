import React from "react";
import { usePassengerCar,useCalendarCarStore } from "../../store";
import PassengerWrap from "./PassengersWrap";

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
    <PassengerWrap styleContainer="border p-2 max-lg:w-full w-full rounded-sm h-full">
    <div
      className="relative flex items-center gap-3"
      onClick={(e) => {
        e.stopPropagation();
        setIsSelectedPassenger(!isSelectedPassenger);
        setIsDateSelectedPickUp(false);
        setIsDateSelectedDropOff(false);
      }}
    >
      <i className="fa-solid fa-users"></i>
      <div className="RAG flex flex-col justify-center items-start">
        <p className="text-[10px] font-normal">passenger</p>
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
        className={`bg-white w-full absolute top-12 border border-gray-300 z-10 rounded-sm ${
          isSelectedPassenger ? "" : "hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="passengers w-full">
          <div className="flex flex-col text-center overflow-hidden shadow-md">
            {numberPassengerOptions.map((label: string, index) => (
              <div
                key={index}
                className={`p-3 hover:bg-gray-200 cursor-pointer transition`}
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
    </div>
    </PassengerWrap>

  );
};

export default Passengers;
