import React, { useState } from "react";
import { Button } from "../UI";
import useTravelerHotel from "../../store/PassengerStore/CustomerHotelStore";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";

const PassengersHotel = () => {
  const {
    incrementAdult,
    decrementAdult,
    incrementChildren,
    decrementChildren,
    incrementRoom,
    decrementRoom,
    submitTravelerData,
    adultQuantity,
    childrenQuantity,
    roomQuantity,
    maxAdultQuantity,
    maxRoomQuantity,
    minAdultQuantity,
    minRoomQuantity,
    setTotal,
    resetTempTravelerData,
    maxChildrenQuantity,
    total,
  } = useTravelerHotel();

  const [isShow, setIsShow] = useState(false);
  const [isPassenger, setIsPassenger] = useState(false);
  return (
    <WrapDropDownOutLineItem
      handleClickOutSide={() => {
        setIsShow(false);
      }}
      handleShow={() => {
        setIsShow(!isShow);
      }}
      className="w-full"
    >
      <i className="fa-solid fa-users"></i>
      <div className="RAG">
        <p className="text-[10px]">Room/Guests</p>
        <p className="text-[13px] font-bold">{`
          ${roomQuantity} phòng
           ,${`${adultQuantity} Người lớn, ${childrenQuantity} Trẻ em`}`}</p>
      </div>
      <i className="fa-solid fa-caret-down"></i>

      <div
        className={`bg-white absolute top-[62px] border border-gray-300 rounded-2xl z-10 ${
          isShow ? "" : "hidden"
        }`}
      >
        {" "}
        <div
          className="traverSelected relative p-10 w-[340px]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="absolute top-0 right-0 p-4 cursor-pointer"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <div className="flex gap-6 flex-col border-b pb-4 border-gray-300">
            <div className="flex justify-between items-center border-b border-gray-300 pb-3">
              <div className="w-1/2">
                <p className="font-bold">Room</p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <button
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    roomQuantity == minRoomQuantity ? "bg-gray-200" : ""
                  }`}
                  onClick={() => decrementRoom()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">
                  {roomQuantity}
                </p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    roomQuantity == maxRoomQuantity ? "bg-gray-200" : ""
                  }`}
                  onClick={() => incrementRoom()}
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="w-1/2">
                <p className="font-bold">Adult</p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <button
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    minAdultQuantity == adultQuantity ? "bg-gray-200" : ""
                  }`}
                  onClick={() => decrementAdult()}
                  disabled={minAdultQuantity == adultQuantity ? true : false}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">
                  {adultQuantity}
                </p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    maxAdultQuantity == adultQuantity ? "bg-gray-200" : ""
                  }`}
                  onClick={() => incrementAdult()}
                  disabled={maxAdultQuantity == adultQuantity ? true : false}
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
                    childrenQuantity == 0 ? "bg-gray-200" : ""
                  }`}
                  onClick={() => decrementChildren()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">
                  {childrenQuantity}
                </p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${
                    childrenQuantity == maxChildrenQuantity
                      ? "bg-gray-400"
                      : ""
                  }`}
                  onClick={() => incrementChildren()}
                >
                  <i className="fa-solid fa-plus text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapDropDownOutLineItem>
  );
};

export default PassengersHotel;
