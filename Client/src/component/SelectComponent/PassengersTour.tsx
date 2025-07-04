import React from "react";
import { Button } from "../ButtonComponent/Button";
import useTravelerTour from "../../store/PassengerStore/traveler_store_tour";
import PassengerWrap from "./PassengersWrap";

interface PassengersTourProp{
  containerStyle?:string;
  passengerStyle?:string
}

const PassengersTour = ({containerStyle,passengerStyle}:PassengersTourProp) => {
  const {
    incrementAdult,
    decrementAdult,
    incrementChildren,
    decrementChildren,
    tempAdultQuantity,
    tempChildrenQuantity,
    submitTravelerData,
    maxAdultQuantity,
    minAdultQuantity,
    setTotal,
    total,
    setIsShow,
    isShow,
    resetTempTravelerData,
  } = useTravelerTour();
  return (
    <div
      className="tourPassenger flex border justify-evenly items-center p-1.5 gap-3 rounded-sm"
      onClick={(e) => {
        setIsShow(!isShow);
      }}
    >
      <i className="fa-solid fa-users"></i>
      <div className="RAG text-center ">
        <p className="text-[10px]">Passengers</p>
        <p className="text-[10=3px] font-bold">{total}</p>
      </div>
      <i className="fa-solid fa-caret-down"></i>

      <div
        className={`bg-white absolute top-28 border border-gray-300 rounded-sm z-10 ${
          isShow ? "" : "hidden"
        }`}
      >
        <div
          className="traverSelected relative p-10 w-[400px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="absolute top-0 right-0 p-4"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <div className="flex gap-6 flex-col border-b pb-4 border-gray-300">
  
            <div className="flex justify-between items-center">
              <div className="w-1/2">
                <p className="font-bold">Adult</p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <button
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    minAdultQuantity == tempAdultQuantity ? "bg-gray-200" : ""
                  }`}
                  onClick={() => decrementAdult()}
                  disabled={
                    minAdultQuantity == tempAdultQuantity ? true : false
                  }
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">
                  {tempAdultQuantity}
                </p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    maxAdultQuantity == tempAdultQuantity ? "bg-gray-200" : ""
                  }`}
                  onClick={() => incrementAdult()}
                  disabled={
                    maxAdultQuantity == tempAdultQuantity ? true : false
                  }
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="w-1/2">
                <p className="font-bold">Children</p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <button
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    tempChildrenQuantity == 0 ? "bg-gray-200" : ""
                  }`}
                  onClick={() => decrementChildren()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">
                  {tempChildrenQuantity}
                </p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer`}
                  onClick={() => incrementChildren()}
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="tagHandle pt-4 flex justify-between items-center">
            <div
              className="underline text-black font-semibold cursor-pointer"
              onClick={resetTempTravelerData}
            >
              Reset
            </div>

            <Button
              className="w-30"
              onClick={() => {
                submitTravelerData();
                setTotal();
                setIsShow(!isShow)
              }}
            >
              <p>Update</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengersTour;
