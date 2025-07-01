import React, { useState } from "react";
import RatingStar from "../../component/StarRatingRadioOption";
import { Link, useNavigate } from "react-router";
import Comment from "../Comment";
import Calendar_Tour from "../../component/calendar/CalendarTour";
import { useTourCalendar } from "../../store/CalendarStore/calendar_tour_store";
import { formatDate } from "../../utils/TimeHandle";
import Calendar_OneMonth from "../../component/calendar/CalendarBase/Calendar_OneMonth";
import Calendar_Tour_OneMonth from "../../component/calendar/CalendarTourOneMonth";
import useTravelerTour from "../../store/PassengerStore/traveler_store_tour";
import { Button,ButtonIcon } from "../../component/ButtonComponent/Button";
import { FaHeart } from "react-icons/fa";
import Traveler_Tour from "../../component/SelectComponent/PassengersTour";
const TourDetail = () => {
  const navigate = useNavigate();

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { datesBook, datesNextMonth, dateSelectedBook, setDateSelectedBook } =
    useTourCalendar();

  const { total, childrenQuantity, adultQuantity, seniorQuantity } =
    useTravelerTour();

    

  return (
    <div className="w-full py-10 border-t border-gray-300 m-10 justify-center flex flex-col items-center">
      <div className="info w-8/10">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-bold">
              Đà Nẵng - Bà Nà - Cầu Vàng - Sơn Trà - Phổ Cổ Hội An - La Vang - Động Thiên Đường & Động Phong Nha - Huế
            </p>
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
                <i className="fa-solid fa-phone"></i>{" "}
                <span> 0 1 855-211-8647</span>
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
          <ButtonIcon icon={<FaHeart/>} iconColor="*:text-green-500" containStyle="" onClick={()=>{}}>
            Save
            </ButtonIcon>
            </div>
            <div className="flex items-center gap-2">
              <p className="price text-3xl font-bold">$335</p>
              <ButtonIcon>
                View Deal
              </ButtonIcon>
            </div>
          </div>
        </div>

        <div className="img flex my-4 gap-1 w-full justify-center">
          <div className="photoMain w-9/12 h-[600px] overflow-hidden">
            <img
              src={
                "https://media.travel.com.vn/Tour/tfd__1_10656_banahill4.webp"
              }
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col w-2/12 gap-1 h-[600px]">
            <div className="traveler h-1/3 overflow-hidden">
              <img
                src={
                  "https://media.travel.com.vn/Tour/tfd__2_10656_hoianvedem6.webp"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="RoomSuite h-1/3 overflow-hidden">
              <img
                src={
                  "https://media.travel.com.vn/Tour/tfd_240325114849_887163_CHUA%20THIEN%20MU%20(2).jpg"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="video h-1/3 overflow-hidden">
              <img
                src={
                  "https://media.travel.com.vn/Tour/tfd__0_10656_dongphongnha1.webp"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7">
          <div className="infodetail col-span-4 *:mb-3 border border-gray-200 rounded shadow p-4 *:p-3">
            <div className="introduce">
              <p className="text-2xl font-bold">About</p>
              <p>
                Avoid the congestion of New York City down on the ground, and
                take to the sky to see Manhattan during this NYC helicopter
                tour. Catch sight of the Empire State Building, Statue of
                Liberty, Central Park, George Washington Bridge, and many other
                top attractions without standing in line or sitting in traffic.
              </p>
            </div>
            <div className="flex flex-col border-t border-gray-300 *:font-normal *:text-md *:text-gray-800 *:font-sans">
              <div className="item flex gap-2 items-center">
                <i className="fa-solid fa-person"></i>
                <p>Ages 0-99, max of 4 per group</p>
              </div>

              <div className="item flex gap-2 items-center">
                <i className="fa-solid fa-clock"></i>
                <p>Duration: 17-20 minutes</p>
              </div>

              <div className="item flex gap-2 items-center">
                <i className="fa-solid fa-clock"></i>
                <p>Start time: Check availability</p>
              </div>

              <div className="item flex gap-2 items-center">
                <i className="fa-solid fa-mobile"></i>
                <p>Mobile ticket</p>
              </div>

              <div className="item flex gap-2 items-center">
                <i className="fa-solid fa-globe"></i>
                <p>Live guide: English</p>
              </div>
            </div>

            <div className="flex flex-col border-t border-gray-300 *:text-md *:text-gray-800 *:font-sans">
              <div className="text-2xl font-bold ">What's included</div>
              <div className="list pl-4">
                <div className="item list-item">
                  <p>
                    Shared Helicopter Flight (shared experience with other
                    travelers)
                  </p>
                </div>

                <div className="item list-item">
                  <p>
                    Live commentary on board, Floor to ceiling windows, Climate
                    controlled cabin
                  </p>
                </div>

                <div className="item list-item">
                  <p>Heliport Landing and Facility Fees</p>
                </div>

                <div className="item list-item">
                  <p>Fuel surcharge</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-t border-gray-300 *:text-md *:text-gray-800 *:font-sans">
              <div className="text-2xl font-bold ">What's not included</div>
              <div className="list pl-4">
                <div className="item list-item">
                  <p>Gratuities</p>
                </div>

                <div className="item list-item">
                  <p>Tips </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col border-t border-gray-300 *:text-md *:text-gray-800 *:font-sans">
              <div className="text-2xl font-bold ">Departure and return</div>
              <div className="list">
                <div className="item flex flex-col my-5">
                  <p className="font-bold">Start:</p>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <i className="fa-solid fa-location-dot"></i>
                      <p className="font-bold">
                        NYC Horse Carriage Rides EST.1979, 7th Ave &amp; West
                        59th Street, Central Park S, New York, NY 10019, USA
                      </p>
                    </div>
                    <p className="px-5">
                      Check-in is 30 minutes before your flight time. The
                      heliport is a large gray cement building with a big clock
                      on the front. Please let security know you are flying with
                      Helicopter Flight Services and they will direct you to our
                      staff.
                    </p>
                  </div>
                  <p className="font-bold">End:</p>
                  <div className="flex gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <p className="font-bold">
                      NYC Horse Carriage Rides EST.1979, 7th Ave &amp; West 59th
                      Street, Central Park S, New York, NY 10019, USA
                    </p>
                  </div>
                  <p className="px-5">
                    This activity ends back at the meeting point.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="locationAndReview col-span-3 h-fit w-fit *:mb-3 flex flex-col px-4">
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

            <div className="location w-full h-full p-4 rounded border border-gray-200 shadow">
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {" "}
                  <p className="font-bold text-2xl py-2">FROM $140.00</p>
                  <p className="font-light">per group (up to 4)</p>
                </div>

                {/* <div
                  className="w-full gap-2 relative flex justify-start items-center self-end max-sm:flex-wrap max-lg:justify-center
        *:flex *:justify-evenly *:items-center *:p-1.5 *:gap-3 *:border *:border-gray-300 *:rounded-2xl max-lg:w-full *:max-md:w-3/4 *:max-sm:w-full *:shadow-sm"
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
                        {formatDate(dateSelectedBook)}
                      </p>

                      <div
                        className={`bg-white absolute w-[400px] top-ơ0px] left-1/2 -translate-x-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Calendar_Tour_OneMonth/>
                      </div>
                    </div>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div> */}
                <div className="font-bold">Select date and travelers</div>
                <div
                  className="w-full gap-2 relative flex flex-wrap justify-start items-center self-end max-sm:flex-wrap max-lg:justify-center max-lg:w-full"
                >
                  <Calendar_Tour containerStyle={""} CalendarStyleTour={""}/>

                  <Traveler_Tour/>
                </div>

                <div className="option">
                  <label className="relative">
                    <input
                      type="radio"
                      name="radio"
                      className="absolute top-5 right-5"
                    />
                    <div className="flex justify-center items-center">
                      <div className="w-full border-2 p-3 rounded-2xl">
                        <p className="font-bold py-5 text-2xl">Departure</p>

                        <div className="price flex flex-col">
                          <p className="font-extralight text-gray-500 text-[13px]">
                            {adultQuantity} Adults x{" "}
                            <span className="font-semibold text-black">
                              $123
                            </span>
                          </p>
                          <p className="font-extralight text-gray-500 text-[13px]">
                            {childrenQuantity} Children x{" "}
                            <span className="font-semibold text-black">
                              $123
                            </span>
                          </p>
                          <p className="font-extralight text-gray-500"></p>
                          <p className="font-bold text-lg">
                            Total: {(adultQuantity + childrenQuantity) * 243}
                          </p>
                          <p className="text-[10px]">
                            (Price includes taxes and booking fees)
                          </p>
                        </div>

                        <div className="flex justify-center pt-3 flex-wrap gap-2 *:text-center *:font-bold">
                          <div className="border-2 rounded-full p-2 min-w-10 max-w-26 w-full text-center text-white bg-black">
                            <p>10:00 AM</p>
                          </div>
                          <div className="border-2 rounded-full p-2 min-w-10 max-w-26 w-full text-center">
                            <p>10:00 AM</p>
                          </div>
                          <div className="border-2 rounded-full p-2 min-w-10 max-w-26 w-full text-center">
                            <p>10:00 AM</p>
                          </div>
                          <div className="border-2 rounded-full p-2 min-w-10 max-w-26 w-full text-center">
                            <p>10:00 AM</p>
                          </div>
                          <div className="border-2 rounded-full p-2 min-w-10 max-w-26 w-full text-center">
                            <p>10:00 AM</p>
                          </div>
                          <div className="border-2 rounded-full p-2 min-w-10 max-w-26 w-full text-center">
                            <p>10:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <Button className="" onClick={() => {navigate("/Tours/123/booking")}}>
                  book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default TourDetail;
