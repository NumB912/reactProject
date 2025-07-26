import React from "react";
import { Link, useNavigate } from "react-router";
import { useTourCalendar, useTravelerTour } from "../../../store";
import { Button} from "../../../component/UI";
import { formatDate } from "../../../utils/TimeHandle";
import { StarRatingStatic } from "../../../component";
const Payment_Tour = () => {
    const {dateSelectedBook} = useTourCalendar()
    const {childrenQuantity,adultQuantity} = useTravelerTour()
  return (
    <div className="w-3/4">
      <div className="flex w-full border border-gray-300 rounded-md *:text-sm my-2 items-center">
        <div className="flex flex-col justify-center items-start p-4">
          <p className="font-bold">John F Kennedy International Airport</p>
          <p className="text-[12px]">Mon, Jun 2, 2025, 10:00 AM</p>
        </div>

        <div>-</div>
        <div className="flex flex-col justify-between items-center p-4">
          <div>
            <p className="font-bold">John F Kennedy International Airport</p>
            <p className="text-[12px]">Mon, Jun 2, 2025, 10:00 AM</p>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center p-3 flex-wrap">
        {/* Progress Bar Background */}
        <div className="flex w-3/4  flex-row justify-between items-center relative">
          <div className="absolute w-full h-1 top-6 bg-gray-200 z-0"></div>
          <div className="absolute w-1/2 h-1 top-6 bg-blue-200 z-0"></div>
          {/* Step 1 */}
          <div className="booking z-10 flex flex-col justify-center items-center gap-2 relative">
            <div className="bg-black p-2 rounded-full aspect-square text-center text-white font-bold border-4 border-white shadow">
              1
            </div>
          </div>
          {/* Step 2 */}
          <div className="booking z-10 flex flex-col justify-center items-center gap-2 relative">
            <div className="bg-black p-2 rounded-full aspect-square text-center text-white font-bold border-4 border-white shadow">
              2
            </div>
          </div>
          {/* Step 3 */}
          <div className="booking z-10 flex flex-col justify-center items-center gap-2 relative">
            <div className="bg-black p-2 rounded-full aspect-square text-center text-white font-bold border-4 border-white shadow">
              3
            </div>
            {/* <p className="text-[15px]">Confirmation</p> */}
          </div>
        </div>

        <div className="flex justify-between items-end w-3/4">
          <p className="text-[15px] text-center">Information</p>
          <p className="text-[15px] text-center">Detail Payment</p>
          <p className="text-[15px] text-center">Confirmation</p>
        </div>
      </div>

      <p className="font-bold text-2xl">Your Deal</p>
      <div className="grid grid-cols-[1fr_350px] grid-rows-1 border-t border-gray-300 py-5 w-full">
        <div className="flex flex-col gap-3">
          <div className=" infoDriverDetailForm flex flex-col gap-3 border border-gray-300 rounded-md p-3">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col justify-center ">
                <p className="text-2xl font-bold">Payment method</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="w-full flex gap-3">
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt="Payment Method"
                    className="w-10 h-10 object-cover"
                  />
                  <p className="text-md">pay with vnPay</p>
                </div>
                <Button
                  className="bg-black p-3 text-white rounded-md"
                  onClick={() => {}}
                >
                  <Link
                    to="/hotels/123/booking/123/payment"
                    className="p-3 text-white rounded-md"
                  >
                    Choose
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-between gap-2 w-full">
                <div className="w-full flex gap-3">
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt="Payment Method"
                    className="w-10 h-10 object-cover"
                  />
                  <p className="text-md">pay with momo</p>
                </div>
                <Button
                  className="bg-black p-3 text-white rounded-md"
                  onClick={() => {}}
                >
                  <Link
                    to="/hotels/123/booking/123/payment"
                    className=" p-3 text-white rounded-md"
                  >
                    Choose
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className=" infoDriverDetailForm flex flex-col gap-3 border border-gray-300 rounded-md p-3">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col justify-center ">
                <p className="text-2xl font-bold">Credit card</p>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <div className="flex w-full gap-3 flex-col">
                <div className="flex-1">
                  <div className="flex-1">
                    <label className="text-[14px] font-bold">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[14px] font-bold">Card Number</label>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="w-full flex gap-3">
                  <div className="flex flex-col w-1/2 gap-3">
                    <label className="text-[14px] font-bold">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      maxLength={5}
                    />
                  </div>

                  <div className="flex flex-col w-1/2 gap-3">
                    <label className="text-[14px] font-bold">CVC</label>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      maxLength={4}
                    />
                  </div>
                  
                </div>

                   <div className="w-full">
                    <Button
                      className="w-full bg-black text-white py-2 rounded-md"
                      onClick={() => {}}
                    >
                      Pay Now
                    </Button>
                  </div> 
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center px-4 row-span-1">
                      <div className="flex flex-col gap-3 w-full p-3 border border-gray-300 rounded-md">
            <div className=" rounded-b-2xl w-full">
              <div className="infoRoom flex gap-3 py-3">
                <div className="flex gap-2">
                  <img
                    src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-360x240/10/5a/dc/f2.jpg"
                    alt="Hotel"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <div className="propertyDetails">
                  <p className="font-semibold text-sm">
                    Helicopter
                  </p>
                  <StarRatingStatic starNumber={5}/>
                </div>
              </div>
              <div className="Amenities flex flex-col gap-2 p-3 border-t border-gray-400">
                <div className="list-disc text-[15px] flex flex-wrap gap-2">
                    <div className="w-full flex justify-between">
                        <p className="tag">Date</p>
                        <p className="date">{formatDate(dateSelectedBook)}</p>
                    </div>

                         <div className="w-full flex justify-between">
                        <p className="tag">Travelers</p>
                        <div className="traveler">
                                <p>{adultQuantity} Adult</p>
                                <p>{childrenQuantity} Children</p>
                        </div>
                    </div>
                </div>
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
          {/* <div className="furtherDetails flex flex-col gap-3 border border-gray-300 rounded-md p-3 w-full mt-3">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Payment_Tour;
