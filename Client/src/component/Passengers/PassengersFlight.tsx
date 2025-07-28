import React, { useState } from "react";
import { Button } from "../UI";
import { useTravelerFlight } from "../../store";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import DropDownContent from "../DropDownComponent/DropDownContent";

interface PassengerFlightProp {
  onClose: () => void;
}

export const PassengerFlight = ({ onClose }: PassengerFlightProp) => {
  const {
    adultQuantity,
    seniorQuantity,
    childrenQuantity,
    setAddAdultQuantity,
    setAddChildrenQuantity,
    setAddSeniorQuantity,
    setMinusAdultQuantity,
    setMinusChildrenQuantity,
    setMinusSeniorQuantity,
    setReset,
    total
  } = useTravelerFlight();
  const [isShow,setIsShow] = useState<boolean>(false)
  return (
    <WrapDropDownOutLineItem
      handleClickOutSide={() => {setIsShow(false)}}
      handleShow={() => {setIsShow(!isShow)}}
    >        <i className="fa-solid fa-users"></i>
      <div className="flex flex-col justify-center items-center">
        <p className="text-[10px] font-semibold">Passenger</p>
        <p className="text-[13px] font-bold">
          {" "}
          {total == 1
            ? `${total} traveler`
            : `${total} travelers`}
        </p>
      </div>
      <DropDownContent className="bg-white w-[400px] absolute left-0 top-15 border border-gray-300 z-10 rounded-sm p-5" isOpen={isShow}>
        <div className="passenger-flight">
          <div className="flex gap-6 flex-col border-b pb-4 border-gray-300">
            <div className="flex justify-between items-center gap-3">
              <div className="w-1/2">
                <p className="font-bold">Adults</p>
                <p className="font-semibold text-gray-400 text-[10px]">
                  Age 18-64
                </p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <div
                  className="minus bg-black rounded-full text-center flex p-3 cursor-pointer"
                  onClick={() => setMinusAdultQuantity()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </div>
                <p className="quantity text-center text-md w-6">
                  {adultQuantity}
                </p>
                <div
                  className="plus bg-black rounded-full text-center flex p-3 cursor-pointer"
                  onClick={() => setAddAdultQuantity()}
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="w-1/2">
                <p className="font-bold">Seniors</p>
                <p className="font-semibold text-gray-400 text-[10px]">
                  Age 65+
                </p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <div
                  className="minus bg-black rounded-full text-center flex p-3 cursor-pointer"
                  onClick={() => setMinusSeniorQuantity()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </div>
                <p className="quantity text-center text-md w-6">
                  {seniorQuantity}
                </p>
                <div
                  className="plus bg-black rounded-full text-center flex p-3 cursor-pointer"
                  onClick={() => setAddSeniorQuantity()}
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div className="w-1/2">
                <p className="font-bold">Children</p>
                <p className="font-semibold text-gray-400 text-[10px]">
                  Age 3-17
                </p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <div
                  className="minus bg-black rounded-full text-center flex p-3 cursor-pointer"
                  onClick={() => setMinusChildrenQuantity()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </div>
                <p className="quantity text-center text-md w-6">
                  {childrenQuantity}
                </p>
                <div
                  className="plus bg-black rounded-full text-center flex p-3 cursor-pointer"
                  onClick={() => setAddChildrenQuantity()}
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="tagHandle pt-4 flex justify-between items-center">
            <div
              className="underline text-black font-semibold cursor-pointer"
              onClick={setReset}
            >
              Reset
            </div>

            <Button className="w-30" onClick={onClose}>
              <p>Apply</p>
            </Button>
          </div>
        </div>
      </DropDownContent>
    </WrapDropDownOutLineItem>
  );
};
