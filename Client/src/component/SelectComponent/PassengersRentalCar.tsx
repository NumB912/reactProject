import React from "react";
import { usePassengerCar } from "../../store/PassengerStore/traveler_store_car";
import { useCalendarCarStore } from "../../store/CalendarStore/calendar_car_store";
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
            ? `passenger`
            : `${numberPassenger} passengers`}
        </p>
      </div>
      <div
        className={`bg-white w-full absolute top-[238px] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 z-10 rounded-2xl ${
          isSelectedPassenger ? "" : "hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="passengers w-full">
          <div className="flex flex-col text-center rounded-2xl overflow-hidden shadow-md">
            {numberPassengerOptions.map((label: string, index) => (
              <div
                key={index}
                className={`p-3 hover:bg-gray-200 cursor-pointer transition ${
                  index === 0 ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => {
                  setNumberPassenger(label);
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
