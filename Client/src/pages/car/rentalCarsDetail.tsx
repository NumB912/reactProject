import React, { useState } from "react";
import { useCalendarCarStore } from "../../store/calendar_car_store";
import { useTimeStore } from "../../store/time_store";
import Button from "../../component/Button";
import Passengers from "../../component/travelers_quantity/passengers";
import { Calendar_rentalCar } from "../../component/calendar/calendar_rentalCar";
import { Link, useNavigate } from "react-router";
import wild from "../../assets/wild_card.jpg";
const RentalCarsDetail = () => {
  const nagative = useNavigate()
  const {
    setdateSelectedDropOff,
    setDateSelectedPickup,
    dateSelectedPickUp,
    dateSelectedDropOff,
    datesDropOff,
    datesPickUp,
    setDatesDropOffFromDate,
    setDatesPickUpFromDate,
    isDateSelected,
    isDateSelectedDropOff,
    isDateSelectedPickUp,
    setIsDateSelectedDropOff,
    setIsDateSelectedPickUp,
    prevMonthDatesDropOFf,
    prevMonthDatesPickUp,
    nextMonthDatesDropOff,
    nextMonthDatesPickUp,
  } = useCalendarCarStore();

  const {
    setIsDropOffTimeSelected,
    setIsPickUpTimeSelected,
    setTimeDropOffSelected,
    setTimePickUpTimeSelected,
    isDropOffTimeSelected,
    isPickUpTimeSelected,
    timeDropOffSelected,
    timePickUpTimeSelected,
  } = useTimeStore();

  const [passengers, setSelectedPassengers] = useState<string>("Select");
  const [isSelectedPassenger, setIsSelectedPassenger] =
    useState<boolean>(false);
  return (
    <div className="RentalCarsDetail">
      <div className="findTab w-full gap-1 flex flex-wrap justify-center items-center inset-shadow-2xs py-4 pb-7 ">
        <div className="flex flex-col w-full max-sm:w-3/4 my-2">
          <div className="relative flex items-center">
            <input
              type="text"
              className="bg-white p-3 w-full border-gray-400 border"
              placeholder="Pick up location...."
            />
            <button
              type="button"
              className="absolute right-3 p-1 w-[30px] rounded-[10px] bg-black text-white"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>

        <div className="w-full gap-2 relative flex justify-start items-center self-end max-2xl:flex-wrap max-lg:justify-center max-sm:w-3/4">
          <div className="w-full flex items-center justify-center gap-3 max-sm:flex-wrap *:border *:w-full *:p-1 *:flex *:items-center *:gap-3 *:rounded-md">
            <div
              className="CheckInBlock border"
              onClick={(e) => {
                e.stopPropagation();
                setIsDateSelectedPickUp(!isDateSelectedPickUp);
                setIsDateSelectedDropOff(false);
                setIsSelectedPassenger(false);
              }}
            >
              <i className="fa-solid fa-calendar"></i>
              <div className="DCI flex flex-col justify-center w-full">
                <p className="text-[10px] font-normal">Pick up</p>
                <p className="text-[13px] font-bold">
                  {" "}
                  {dateSelectedPickUp.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }) +
                    " - " +
                    timePickUpTimeSelected}
                </p>
              </div>
              <div
                className={`bg-white absolute w-[400px] top-14 left-0 p-5 border border-gray-300 rounded-md z-10
                max-lg:left-full max-2xl:left-0 ${
                  isDateSelectedPickUp ? "" : "hidden"
                }`}
              >
                <Calendar_rentalCar
                  titleTypeSeletedDate="Pick Up"
                  type="rentalCar"
                  dates={datesPickUp} // Provide the appropriate dates array here
                  dateSelected={dateSelectedPickUp}
                  dateEndSelected={dateSelectedDropOff}
                  onSelected={(date: Date) => {
                    setDateSelectedPickup(date);
                  }}
                  selectTime={timePickUpTimeSelected}
                  setSelectTime={(time: string) => {
                    setTimePickUpTimeSelected(time);
                  }}
                  nextMonth={nextMonthDatesPickUp}
                  prevMonth={prevMonthDatesPickUp}
                />
              </div>
            </div>

            <div
              className="CheckInBlock relative"
              onClick={(e) => {
                e.stopPropagation();
                setIsDateSelectedDropOff(!isDateSelectedDropOff);
                setIsDateSelectedPickUp(false);
                setIsSelectedPassenger(false);
              }}
            >
              <i className="fa-solid fa-calendar"></i>
              <div className="DCI flex flex-col justify-center w-full">
                <p className="text-[10px] font-normal">Drop off</p>
                <p className="text-[13px] font-bold">
                  {dateSelectedDropOff.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  }) +
                    " - " +
                    timeDropOffSelected}
                </p>
              </div>

              <div
                className={`bg-white absolute w-[400px] top-14 left-0 p-5 border border-gray-300 rounded-md z-10
                max-lg:left-full max-2xl:left-0 ${
                  isDateSelectedDropOff ? "" : "hidden"
                }`}
              >
                <Calendar_rentalCar
                  titleTypeSeletedDate="Drop Off"
                  type="rentalCar"
                  dates={datesDropOff} // Provide the appropriate dates array here
                  dateSelected={dateSelectedDropOff}
                  onSelected={(date: Date) => {
                    setdateSelectedDropOff(date);
                  }}
                  dateEndSelected={dateSelectedDropOff}
                  selectTime={timeDropOffSelected}
                  setSelectTime={(time: string) => {
                    setTimeDropOffSelected(time);
                  }}
                  nextMonth={nextMonthDatesDropOff}
                  prevMonth={prevMonthDatesDropOFf}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-3 max-sm:flex-wrap *:flex *:items-center *:gap-3 *:rounded-md">
            <div className="search w-full">
              <Button
                onClick={() => {
                  console.log("hello");
                }}
                className="w-full rounded-sm"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <p className="font-bold text-2xl">Your Deal</p>
      <div className="grid grid-cols-[1fr_350px] grid-rows-1 border-t border-gray-300 p-5">
        <div className="flex flex-col gap-3">
          <div className="flex justify-center items-center border-b border-gray-300 p-4">
            <div className="w-full">
              <div className="flex flex-col p-4">
                <p className="text-[12px]">JFK Airport, New York</p>
                <p className="font-bold w-full text-black text-[16px]">
                  Wild card
                </p>
              </div>
              <img
                src={wild}
                alt=""
                srcSet=""
                className=" object-cover w-50 max-sm:w-full"
              />
            </div>

            <div className="flex w-full justify-between items-start h-full p-1.5 max-sm:flex-col">
              <div className="w-full flex flex-col gap-2">
                <div className="w-full *:text-[13px] text-gray-600 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-briefcase"></i>
                    <p>2 bags</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-person"></i> <p>4 Seats</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-suitcase-rolling"></i> 1 small bag
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-car"></i> 4 doors
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-snowflake"></i>Air condition
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-memory"></i> Automatic tranmision
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-gas-pump"></i>Full to full
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-check"></i>Unlimited mileage
                  </div>
                </div>
                <div className="address">
                  <p className="text-[14px] font-bold">Address</p>
                  <p className="text-[13px] text-gray-600">
                    123 Main St, New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full col-span-2 border-b border-gray-300 py-4 flex justify-between items-center">
            <div className="score flex gap-3 items-center">
              <div className="rating h-full">
                <p className="p-3 bg-gray-300 rounded-md font-bold text-white">
                  5
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className=" text-md font-bold">Location Rating</p>
                <p className="text-gray-500 text-sm">Excellent</p>
              </div>
            </div>
          </div>

          <div className="w-full border-b border-gray-300 py-10">
            <p className="text-2xl font-bold">Great choice</p>
            <div className="flex flex-col gap-2 justify-center items-start py-3">
              <div className="flex gap-1 items-center">
                <i className="fa-solid fa-thumbs-up"></i>
                <p> Custome Rating: 5.0/5.0</p>
              </div>
              <div className="flex gap-1 items-center">
                <i className="fa-solid fa-thumbs-up"></i>
                <p>Most popular fuel policy</p>
              </div>
            </div>
          </div>

          <div className="w-full border-b border-gray-300 py-10">
            <p className="text-2xl font-bold">Include in Price</p>
            <div className="flex flex-col gap-2 justify-center items-start py-3">
              <div className="flex gap-1 items-center">
                <i className="fa-solid fa-thumbs-up"></i>
                <p> Unlimited mileage</p>
              </div>
            </div>
          </div>

          <div className="w-full border-b border-gray-300 py-10">
            <p className="text-2xl font-bold">Include in Price</p>
            <div className="grid grid-cols-2 gap-2 py-3 flex-wrap *:w-full">
              <div className="flex flex-col gap-1 justify-center items-start border border-gray-300 p-5">
                <p className="font-semibold">Car seat</p>
                <p className="text-sm text-gray-400">$5 each per rental</p>
                <p className="text-sm">
                  For small children: 9–18 kg/20–40 lbs (about 1–3 years old)
                </p>
                <div className="PlusOrRemove flex gap-2 items-center">
                  <div className="flex items-center border border-gray-300 rounded-md p-2 gap-2 my-3">
                    <button className="rounded-md px-2 py-1 text-blue-500 cursor-pointer">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="mx-2">1</span>
                    <button className="rounded-md px-2 py-1 text-blue-500 cursor-pointer">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 justify-center items-start border border-gray-300 p-5">
                <p className="font-semibold">Booster seat</p>
                <p className="text-sm text-gray-400">$9.99 each per rental</p>
                <p className="text-sm">
                  For bigger children: 18–45 kg/40–100 lbs (about 4–11 years
                  old)
                </p>
                <div className="PlusOrRemove flex gap-2 items-center">
                  <div className="flex items-center border border-gray-300 rounded-md p-2 gap-2 my-3">
                    <button className="rounded-md px-2 py-1 text-blue-500 cursor-pointer">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="mx-2">1</span>
                    <button className="rounded-md px-2 py-1 text-blue-500 cursor-pointer">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 justify-center items-start border border-gray-300 p-5">
                <p className="font-semibold">Infant car seat</p>
                <p className="text-sm text-gray-400">$9.99 each per rental</p>
                <p className="text-sm">
                  For babies: up to 9 kg/20 lbs (about 1 year old)
                </p>
                <div className="PlusOrRemove flex gap-2 items-center">
                  <div className="flex items-center border border-gray-300 rounded-md p-2 gap-2 my-3">
                    <button className="rounded-md px-2 py-1 text-blue-500 cursor-pointer">
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="mx-2">1</span>
                    <button className="rounded-md px-2 py-1 text-blue-500 cursor-pointer">
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center p-4 row-span-1">
          <div className="pickUpAndDropOff flex flex-col gap-3 border border-gray-300 rounded-md p-3 w-full">
            <p className="font-bold py-3 w-full text-xl">
              Pick-up and Drop-off
            </p>
            <div className="pickup flex justify-center gap-3">
              <div className="icon">o</div>
              <div className=" flex flex-col justify-center gap-3">
                <p>Mon, Jun 2,2025 - 10:00 AM</p>
                <p className="font-bold">
                  John F Kennedy International Airport
                </p>
                <div className="text-blue-400">View more info</div>
              </div>
            </div>

            <div className="dropOff flex justify-center gap-3">
              <div className="icon">o</div>
              <div className=" flex flex-col justify-center gap-3">
                <p>Mon, Jun 2,2025 - 10:00 AM</p>
                <p className="font-bold">
                  John F Kennedy International Airport
                </p>
                <div className="text-blue-400">View more info</div>
              </div>
            </div>
          </div>
          <div className="furtherDetails flex flex-col gap-3 border border-gray-300 rounded-md p-3 w-full mt-3">
            <p className="font-bold py-3 w-full text-xl">Further details</p>
            <div className="flex flex-col gap-2">
              <p className="text-[14px]">
                Please note that the car will be picked up and dropped off at
                the airport. The car rental company will provide you with the
                necessary instructions for the pick-up and drop-off process.
              </p>
              <p className="text-[14px]">
                If you have any special requests or requirements, please let us
                know in advance so we can assist you accordingly.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full p-3 border border-gray-300 rounded-md mt-3">
            <div className="flex justify-between items-center w-full">
              <p className="text-[16px] font-bold">Price</p>
              <p className="text-[16px] font-bold">$ 100.00</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[16px] font-bold">Insurance</p>
              <p className="text-[16px] font-bold">$ 20.00</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[16px] font-bold">Taxes and fees</p>
              <p className="text-[16px] font-bold">$ 10.00</p>
            </div>
            <hr />
            <div className="flex justify-between items-center w-full">
              <p className="text-[16px] font-bold">Total</p>
              <p className="text-[16px] font-bold">$ 130.00</p>
            </div>

              <Button
                className="w-full mt-3"
                onClick={() => {
                  nagative("/rentalCar/123/Booking/payment")
                }}
              >
                Book Now
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCarsDetail;
