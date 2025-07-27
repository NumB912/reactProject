import React, { useState } from "react";
import { Button } from "../UI";
import useTravelerHotel from "../../store/PassengerStore/CustomerHotelStore";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";


const PassengersHotel = () => {
  const {
    incrementAdult,
    decrementAdult,
    incrementChildren,
    decrementChildren,
    incrementRoom,
    decrementRoom,
    tempAdultQuantity,
    tempChildrenQuantity,
    tempRoomQuantity,
    submitTravelerData,
    maxAdultQuantity,
    maxRoomQuantity,
    minAdultQuantity,
    minRoomQuantity,
    setTotal,
    resetTempTravelerData
  } = useTravelerHotel();

  const { roomQuantity, total } = useTravelerHotel();
  const [showRoomAndGuest, setShowRoomAndGuest] = useState(false);
  return (
    <WrapDropDownOutLineItem handleOnClick={ () => {
        setShowRoomAndGuest(!showRoomAndGuest)
      }}>
      <i className="fa-solid fa-users"></i>
      <div className="RAG max-md:min-w-60 text-center max-sm:min-w-50">
        <p className="text-[10px]">Room/Guests</p>
        <p className="text-[13px] font-bold">{`${roomQuantity > 1
          ? `${roomQuantity} rooms`
          : `${roomQuantity} room`
          } ,${total > 1 ? `${total} guests` : `${total} guest`}`}</p>
      </div>
      <i className="fa-solid fa-caret-down"></i>

      <div
        className={`bg-white absolute top-[62px] border border-gray-300 rounded-2xl z-10 ${showRoomAndGuest ? "" : "hidden"
          }`}
      > <div className="traverSelected relative p-10 w-[340px]" onClick={(e) => { e.stopPropagation() }}>
          <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={() => {
            setShowRoomAndGuest(!showRoomAndGuest)
          }}>
            <i className="fa-solid fa-xmark"></i>
          </div>

          <div className="flex gap-6 flex-col border-b pb-4 border-gray-300">
            <div className="flex justify-between items-center border-b border-gray-300 pb-3">
              <div className="w-1/2">
                <p className="font-bold">Room</p>
              </div>
              <div className="select flex gap-2 items-center w-1/2 justify-end">
                <button
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${tempRoomQuantity == minRoomQuantity ? "bg-gray-200" : ""}`}
                  onClick={() => decrementRoom()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">{tempRoomQuantity}</p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${tempRoomQuantity == maxRoomQuantity ? "bg-gray-200" : ""}`}
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
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${minAdultQuantity == tempAdultQuantity ? "bg-gray-200" : ""}`}
                  onClick={() => decrementAdult()}
                  disabled={minAdultQuantity == tempAdultQuantity ? true : false}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">{tempAdultQuantity}</p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${maxAdultQuantity == tempAdultQuantity ? "bg-gray-200" : ""}`}
                  onClick={() => incrementAdult()}
                  disabled={maxAdultQuantity == tempAdultQuantity ? true : false}
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
                  className={`minus bg-black rounded-full text-center flex p-3 cursor-pointer ${tempChildrenQuantity == 0 ? "bg-gray-200" : ""}`}
                  onClick={() => decrementChildren()}
                >
                  <i className="fa-solid fa-minus text-white"></i>
                </button>
                <p className="quantity text-center text-md w-6">
                  {tempChildrenQuantity}
                </p>
                <button
                  className={`plus bg-black rounded-full text-center flex p-3 cursor-pointer ${tempChildrenQuantity == Math.min(20, tempRoomQuantity * 10) ? "bg-gray-400" : ""}`}
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

            <Button className="w-30" onClick={() => {
              submitTravelerData()
              setTotal()

            }}>
              <p>Update</p>
            </Button>
          </div>
        </div>
      </div>
    </WrapDropDownOutLineItem>


  );
};

export default PassengersHotel;
