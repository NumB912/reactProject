import React from "react";
import { Button } from "../../component/ButtonComponent/Button";
import { Link } from "react-router";
import wild from "../../assets/wild_card.jpg";
import BillingAddressForm from "./BillingAddressForm";
import DriverDetailForm from "./DriverDetailForm";
import Payment from "./Payment";

const BookCar = () => {
  return (
    <div className="w-3/4">
      <div className="flex w-full border border-gray-300 rounded-md *:text-sm my-4 items-center">
        <div className="flex flex-col justify-center items-start p-4">
          <p className="font-bold">John F Kennedy International Airport</p>
          <p className="text-[12px]">
            Mon, Jun 2, 2025, 10:00 AM
          </p>

        </div>

        <div>
          -
        </div>
        <div className="flex flex-col justify-between items-center p-4">
        <div>        
          <p className="font-bold">John F Kennedy International Airport</p>
          <p className="text-[12px]">
            Mon, Jun 2, 2025, 10:00 AM
          </p></div>
        </div>
      </div>
      <p className="font-bold text-2xl">Your Deal</p>
      <div className="grid grid-cols-[1fr_350px] grid-rows-1 border-t border-gray-300 py-5 w-full">
        <div className="flex flex-col gap-3">
          <div className="flex justify-center items-center p-4 border border-gray-300">
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

          <div className="w-full col-span-2 border border-gray-300 flex justify-between items-center p-3 rounded-md">
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

          <div className=" infoDriverDetailForm flex flex-col gap-3 border border-gray-300 rounded-md p-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center ">
                <p className="text-2xl font-bold">Driver Details</p>
                <p className="text-[13px] text-gray-600">
                  As they appear on driver's license
                </p>
              </div>
            </div>
            <DriverDetailForm />
          </div>

          <div className="bullingaddress border border-gray-300 rounded-md flex-col flex p-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center">
                <p className="text-2xl font-bold">Billing Address</p>
                <p className="text-[13px] text-gray-600">
                  As they appear on driver's license
                </p>
              </div>
            </div>
            <BillingAddressForm />
          </div>

          <Button
            className=" bg-blue-500 text-white font-bold py-2 rounded-md self-end" onClick={() => {}}>
            <Link to="/rentalCar/123/booking/payment">Next</Link>
            </Button>
        </div>

        <div className="flex flex-col justify-start items-center px-4 row-span-1">
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

        </div>
      </div>
    </div>
  );
};

export default BookCar;
