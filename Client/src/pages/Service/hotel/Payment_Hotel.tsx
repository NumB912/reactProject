import React from "react";
import { Link } from "react-router";
import wild from "../../../assets/Wild_Card.jpg";
import vnpay from "../../../assets/icon_payment/vnpay.jpg"; // Ensure this path is correct
import momo from "../../../assets/icon_payment/momo.png"; // Ensure this path is correct
import { Button } from "../../../component/UI";
const Payment_Hotel = () => {
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
                    src={vnpay}
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
                    src={momo}
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
            <p className="text-[16px] font-bold nameHotel">
              3F 14 alley 31 Xuan Dieu
            </p>
            <p className="location text-[12px]">
              14 Ngõ 31 Đường Xuân Diệu, Quận Tây Hồ, 100000 Hà Nội, Việt Nam
            </p>
            <div className="rating">
              <p className="text-[16px] font-bold">Rating</p>
              <div className="flex gap-2 items-center">
                <i className="fa-solid fa-star text-yellow-500"></i>
                <p className="text-[16px]">4.5</p>
                <p>Good</p>
                <p className="text-[14px] text-gray-600">(1,645 Reviews)</p>
              </div>
            </div>
          </div>

          <div className="pickUpAndDropOff flex flex-col gap-3 border border-gray-300 rounded-md p-3 w-full">
            <p className="font-bold py-1 w-full text-md">
              Check-in, check-out details
            </p>
            <div className="pickup flex justify-center gap-3">
              <div className="icon">o</div>
              <div className=" flex flex-col justify-center gap-1 w-full">
                <p className="font-semibold">Monday, June 2,2025</p>
                <p className="text-[12px]">10:00 AM - 23:30 PM</p>
              </div>
            </div>

            <div className="dropOff flex justify-center gap-3">
              <div className="icon">o</div>
              <div className=" flex flex-col justify-center gap-1 w-full">
                <p className="font-semibold">Monday, June 2,2025</p>
                <p className="text-[12px]">10:00 AM - 12:00 PM</p>
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

          <div className="flex flex-col gap-3 w-full p-3 border border-gray-300 rounded-md mt-3">
            <div className="flex justify-between items-center w-full">
              <p className="font-bold">You're choosen</p>
            </div>
            <div className=" rounded-b-2xl w-full">
              <div className="infoRoom flex gap-3">
                <div className="flex gap-2">
                  <img
                    src={wild}
                    alt="Hotel"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <div className="propertyDetails">
                  <p className="font-semibold text-sm">
                    1 Queen Premium High Floor
                  </p>
                  <div className="Amenity flex flex-col gap-1 *:text-[10px]">
                    <p>
                      <i className="fa-solid fa-maximize"></i> 310 sq ft
                    </p>
                    <p>
                      <i className="fa-solid fa-user-group"></i> Sleeps 2
                    </p>
                    <p>
                      <i className="fa-solid fa-bed"></i> 1 Double bed
                    </p>
                  </div>
                </div>
              </div>
              <div className="Amenities flex flex-col gap-2 p-3">
                <p className="text-[14px] font-bold">Amenities</p>
                <div className="list-disc pl-5 text-[12px] flex flex-wrap gap-2">
                  <div className="flex gap-2 min-w-[100px]">
                    <i className="fa-solid fa-wifi"></i>
                    <p>Free Wi-Fi</p>
                  </div>
                  <div className="flex gap-2 min-w-[100px]">
                    <i className="fa-solid fa-tv"></i>
                    <p>Flat-screen TV</p>
                  </div>
                  <div className="flex gap-2 min-w-[100px]">
                    <i className="fa-solid fa-snowflake"></i>
                    <p>Air Conditioning</p>
                  </div>

                  <div className="flex gap-2 min-w-[100px]">
                    <i className="fa-solid fa-shower"></i>
                    <p>Room Service</p>
                  </div>
                  <div className="flex gap-2 min-w-[100px]">
                    <i className="fa-solid fa-water"></i>
                    <p>Swimming Pool</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment_Hotel;
