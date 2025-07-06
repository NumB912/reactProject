import React from "react";
import { Button } from "../../../component/UI";
import { Link } from "react-router";
import wild from "../../../assets/wild_card.jpg";

const Book_Hotel = () => {
  return (
    <div className="w-3/4">
      <div className="flex w-full border border-gray-300 rounded-md *:text-sm my-4 items-center">
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
      <p className="font-bold text-2xl">Your Deal</p>
      <div className="grid grid-cols-[1fr_350px] grid-rows-1 border-t border-gray-300 py-5 w-full">
        <div className="flex flex-col gap-3">
          <div className=" infoDriverDetailForm flex flex-col gap-3 border border-gray-300 rounded-md p-3">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col justify-center ">
                <p className="text-2xl font-bold">Contact Details</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <div className="flex flex-col justify-center w-full gap-1">
                  <label className="text-[14px] font-bold">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div className="flex flex-col justify-center w-full gap-1">
                  <label className="text-[14px] font-bold">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
              </div>

              <div className="w-1/2 flex flex-col justify-center gap-1">
                <label className="text-[14px] font-bold">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              <div className="w-1/2 flex flex-col justify-center gap-1">
                <label className="text-[14px] font-bold">Address</label>
                <input
                  type="Address"
                  placeholder="Address"
                  name="Address"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>

              <div className="w-1/2 flex flex-col justify-center gap-1">
                <label className="text-[14px] font-bold">Number Phone</label>
                <input
                  type="tel"
                  placeholder="Number Phone"
                  name="Number Phone"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
          </div>

          <div className="bullingaddress border border-gray-300 rounded-md flex-col flex p-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col justify-center">
                <div className="pb-5">
                  {" "}
                  <p className="text-2xl font-bold">Info Customer</p>
                  <p className="text-[13px] text-gray-600">
                    Customer information is required to complete the booking.
                  </p>
                </div>
                <div className="flex items-center gap-2 py-3">
                  <i className="fa-solid fa-user"></i>
                  <p>
                    <strong>Guest:</strong> 2 Adults, 0 Children, 0 Infants
                  </p>
                </div>
                <div className="flex gap-1">
                  <div className="flex flex-col justify-center w-full gap-1">
                    <label className="text-[14px] font-bold">Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="FullNameCustomer"
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full gap-1">
                    <label className="text-[14px] font-bold">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="emailCustomer"
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <BillingAddressForm /> */}
          </div>

          <div className="payment-section border border-gray-300 p-3 flex-col flex">
            <div className="flex flex-col gap-2 py-4">
              <div className="flex flex-col justify-center">
                <p className="text-2xl font-bold">Rules</p>
                <p className="font-normal">
                  The property owner wants you to agree to these house rules:
                </p>
                <ul className="text-[13px] text-black list-disc pl-5">
                  <li>No smoking</li>
                  <li>No pets</li>
                  <li>No party</li>
                </ul>
              </div>
            </div>
            {/* <Payment /> */}
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
            <div className="">
              <Button
                className="w-full bg-black text-white py-2 rounded-md"
                onClick={() => {}}
              >
                <Link to="/hotels/123/booking/123/payment">Book Now</Link>
              </Button>
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

export default Book_Hotel;
