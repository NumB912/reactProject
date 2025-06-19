import React, { useState } from "react";
import RatingStar from "../../component/SIdeBarFilter/OptionType/OptionMaterial/StarRatingRadioOption";
import { useNavigate } from "react-router-dom";
import mainImage from "../../assets/the-tusk-bar.jpg";
import video from "../../assets/the-evelyn-hotel-1.jpg";
import suitable from "../../assets/nomad-suite-bedroom.jpg";
import traveler from "../../assets/caption.jpg";
import hotel1 from "../../assets/42769_14072300320020409156.webp";
import Comment from "../Comment";
import Button from "../../component/Button";
import { formatDate } from "../../utils/TimeHandle";
import { useCalendarHotel } from "../../store/calendar_hotel_store";
import Calendar_Hotel from "../../component/calendar/calendar_hotel";
import useTravelerHotel from "../../store/traveler_store_hotel";
import Traveler_Hotel from "../../component/travelers_quantity/traveler_hotel";
import {Link} from "react-router"
const HotelDetail = () => {
  const navigate = useNavigate();
    const {
      dateSelectedBook,
      dateSelectedCheckOut,
      isSelectedCheckOut,
      isSelectedBook,
    } = useCalendarHotel();

      const [showCheckIn, setShowCheckIn] = useState(false);
      const [favorite, setFavorite] = useState(false);
      const [showRoomAndGuest, setShowRoomAndGuest] = useState(false);
        const { roomQuantity, total } = useTravelerHotel();
  return (
    <div className="w-full py-10 border-t border-gray-300 m-10 justify-center flex flex-col items-center">
      <div className="info w-8/10">
       <div>
          <div className="findTab w-full gap-1 flex col-span-2 justify-center items-center inset-shadow-2xs py-4 pb-7 border-b border-gray-300 ">
                <div className="flex flex-col w-2/5 border-r border-gray-200 p-2 max-lg:hidden ">
                  <p className="text-[15px] font-bold px-2">Location:</p>
        
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      className="bg-white p-2  w-full"
                      placeholder="Find hotels...."
                    />
                    <button
                      type="button"
                      className="absolute right-1 p-1 w-[30px] rounded-[10px] bg-black text-white"
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                  </div>
                </div>
        
                <div
                  className="w-3/5 gap-2 relative flex justify-start items-center self-end max-sm:flex-wrap max-lg:justify-center
                *:flex *:justify-evenly *:items-center *:p-1.5 *:w-full *:gap-3 *:border *:border-gray-300 *:rounded-2xl max-lg:w-full *:max-md:w-3/4 *:max-sm:w-full *:shadow-sm"
                >
                  <div
                    className="CheckInBlock relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCheckIn(!showCheckIn);
                    }}
                  >
                    <i className="fa-solid fa-calendar"></i>
                    <div className="DCI text-center max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50">
                      <p className="text-[10px]">Check In - Check Out</p>
                      <p className="text-[13px] font-bold">
                        {formatDate(dateSelectedBook)} -{" "}
                        {formatDate(dateSelectedCheckOut)}
                      </p>
        
                      <div
                        className={`bg-white absolute w-[700px] top-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-10
              max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Calendar_Hotel />
                      </div>
                    </div>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                  <div
                    className="roomAndGuest"
                    onClick={(e) => {
                      setShowRoomAndGuest(!showRoomAndGuest);
                    }}
                  >
                    <i className="fa-solid fa-users"></i>
                    <div className="RAG max-md:min-w-60 text-center max-sm:min-w-50">
                      <p className="text-[10px]">Room/Guests</p>
                      <p className="text-[13px] font-bold">{`${
                        roomQuantity > 1
                          ? `${roomQuantity} rooms`
                          : `${roomQuantity} room`
                      } ,${total > 1 ? `${total} guests` : `${total} guest`}`}</p>
                    </div>
                    <i className="fa-solid fa-caret-down"></i>
        
                    <div
                      className={`bg-white absolute top-[62px] border border-gray-300 rounded-2xl z-10 ${
                        showRoomAndGuest ? "" : "hidden"
                      }`}
                    >
                      <Traveler_Hotel onClose={setShowRoomAndGuest} />
                    </div>
                  </div>
                </div>
              </div>
       </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-bold">The Evelyn Hot</p>
            <div className="flex items-center gap-2">
              <p>4.8</p>

              <RatingStar stars={5} />

              <p>(1.645 Reviews)</p>
            </div>

            <p className="">
              <i className="fa-solid fa-location-dot"></i> 7 E 27th St, New York
              City, NY 10016-8701
            </p>

            <div className="flex gap-4 *:text-gray-800 *:hover:underline">
              <Link to="#">
                <i className="fa-solid fa-phone"></i> <span> 0 1 855-211-8647</span>
              </Link>
              <Link to="#">
                <i className="fa-solid fa-pen"></i> <span> Write review</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex gap-2 justify-end items-center">
              <p className="copyURL">
                <i className="fa-solid fa-copy"></i>
              </p>
              <button className="rounded-full border border-gray-200 p-3 w-24">
                <i className="fa-solid fa-heart"></i> Save
              </button>
            </div>
            <div className="flex items-center gap-2">
              <p className="price text-3xl font-bold">$335</p>
              <button className="rounded-full border border-gray-200 p-3 w-24">
                View Deal
              </button>
            </div>
          </div>
        </div>

        <div className="img flex my-4 gap-1 w-full justify-center">
          <div className="photoMain w-9/12 h-[600px] overflow-hidden">
            <img
              src={mainImage}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col w-2/12 gap-1 h-[600px]">
            <div className="traveler h-1/3 overflow-hidden">
              <img
                src={traveler}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="RoomSuite h-1/3 overflow-hidden">
              <img
                src={suitable}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="video h-1/3 overflow-hidden">
              <img
                src={video}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 grid-rows-2">
          <div className="infodetail col-span-5 row-span-2 *:mb-3">
            <div className="introduce shadow p-4 border border-gray-200 rounded">
              <p className="text-2xl font-bold">Introduce</p>
              <p>
                Get your trip off to a great start with a stay at this hotel,
                which offers free Wi-Fi in all rooms. Centrally located in New
                York (NY)'s Financial District, this property puts you close to
                exciting attractions and dining options. Don't leave before
                visiting the famous Central Park. Rated 3.5 stars, this
                high-quality property offers guests access to an on-site gym and
                restaurant.
              </p>
            </div>

            <div className="Hightlights shadow p-4 border border-gray-200 rounded">
              <p className="text-2xl font-bold mb-6">Hightlights</p>
              <div className="flex justify-center items-center gap-2">
                <div className="flex h-[80px] w-[150px] justify-center">
                  <div className="flex flex-col justify-start items-center">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p className="text-sm max-w-40 text-center">
                      Suitable for activities
                    </p>
                  </div>
                </div>

                <div className="flex h-[80px] w-[150px] justify-center">
                  <div className="flex flex-col justify-start items-center">
                    <i className="fa-solid fa-bus"></i>
                    <p className="text-sm max-w-40 text-center">
                      360 m from public transport
                    </p>
                  </div>
                </div>

                <div className="flex h-[80px] w-[150px] justify-center">
                  <div className="flex flex-col justify-start items-center">
                    <i className="fa-solid fa-circle-check"></i>
                    <p className="text-sm max-w-40 text-center">
                      Check-in [24 hours]
                    </p>
                  </div>
                </div>

                <div className="flex h-[80px] w-[150px] justify-center">
                  <div className="flex flex-col justify-start items-center">
                    <i className="fa-solid fa-shield"></i>
                    <p className="text-sm max-w-40 text-center">
                      More hygiene{" "}
                    </p>
                  </div>
                </div>

                <div className="flex h-[80px] w-[150px] justify-center">
                  <div className="flex flex-col justify-start items-center">
                    <i className="fa-solid fa-building-columns"></i>
                    <p className="text-sm max-w-40 text-center">
                      The National 9/11 Memorial & Museum 870 m
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Facilities shadow  p-4 border border-gray-200 rounded">
              <p className="text-2xl font-bold mb-6">Facilities</p>
              <div className="flex justify-start items-center gap-1 flex-wrap *:w-[153px] *:text-[13px]">
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Free Wi-Fi</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Reception desk [24 hours]</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Fitness center</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Restaurant</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Bar</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Luggage storage</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Pets allowed</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <i className="fa-solid fa-check"></i>
                  <p>Rooftop area</p>
                </div>
              </div>
            </div>
          </div>
          <div className="locationAndReview col-span-2 row-span-2 *:mb-3 flex flex-col px-4">
            <div className="Review rounded shadow p-4">
              <div className="review">
                <p className="text-xl font-bold">8,4 Great</p>
                <p className="text-gray-500 text-sm">
                  <i className="fa-solid fa-check-double"></i> 1,289 reviews
                </p>
              </div>
              <div className="flex flex-wrap *:text-sm gap-2 py-3 *:bg-green-300 *:p-1 *:rounded">
                <p>Cleanliness 8.7</p>
                <p>Position 8.6</p>
                <p>Service 8.3</p>
                <p>Facilities 7.8</p>
              </div>
            </div>

            <div className="location w-full h-full p-4 rounded border border-gray-200 shadow"></div>
          </div>
        </div>

        <div className="">
          <p className="text-2xl font-bold">Select room</p>
          <div className="flex gap-2 *:p-1.5 *:border *:rounded-3xl *:text-[10px] *:font-bold *:border-gray-400 *:max-sm:hidden *:w-[60px] *:text-center py-3">
            <div className="tag active bg-black text-white">
              <p>All</p>
            </div>
            <div className="tag">
              <p>1 Bed</p>
            </div>
            <div className="tag">
              <p>2 Beds</p>
            </div>
          </div>
          <div className="flex flex-wrap *:w-[calc(33%-1rem)] gap-5">
            <div className="flex flex-col items-start flex-wrap ">
              <div className="images w-full">
                <img src={hotel1} className="rounded-t-md w-full"></img>
              </div>
              <div className="border border-gray-300 p-5 rounded-b-2xl w-full">
                <div className="infoRoom ">
                  <p className="font-semibold py-3">
                    1 Queen Premium High Floor
                  </p>
                  <div className="Amenities">
                    <div className="Amenity flex flex-col gap-2">
                      <p>
                        <i className="fa-solid fa-maximize"></i> 310 sq ft
                      </p>
                      <p>
                        <i className="fa-solid fa-user-group"></i> Sleeps 2
                      </p>
                      <p>
                        <i className="fa-solid fa-bed"></i> 1 Double bed
                      </p>
                      <Link to="#" className="text-blue-400">
                        More detail <i className="fa-solid fa-chevron-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="price flex justify-end w-full">
                    <p className="font-bold">$275 nightly</p>
                  </div>
                  <div className="flex *:text-[13px] justify-between">
                    <p className="text-red-400">We have 2 left</p>
                    <p className="text-green-400">
                      Total includes taxes and fees
                    </p>
                  </div>
           <Button className="w-full bg-black text-white rounded-full p-3" onClick={() => {(navigate("/hotels/123/booking/123"))}}>
                <i className="fa-solid fa-cart-shopping"></i> Book now
                </Button>

                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default HotelDetail;
