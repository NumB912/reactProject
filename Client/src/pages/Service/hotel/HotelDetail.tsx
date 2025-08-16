import React, { useState } from "react";
import { Button, ButtonIcon } from "../../../component/UI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { FaHeart } from "react-icons/fa6";
import FilterCheckInHotel from "../../../component/FilterComponent/SearchFilterHotel";
import Comment from "../../Comment";
import { StarRatingStatic } from "../../../component";
import CardContent from "../../../component/CardContent";
import IconLabel from "../../../component/UI/IconLabel";
import RoomCard from "./RoomCard";
import { Room } from "./modal/Room";
import IconButton from "../../../component/UI/Button/IconButton";
const HotelDetail = () => {
  const navigate = useNavigate();
  const rooms: Room[] = [
    {
      id: "room-101",
      name: "Deluxe Sea View Room",
      price: 1500000,
      area: 35,
      beds: [{ id: "bed-1", name: "1 King Bed" }],
      FacilitesGroup: [
        {
          id: "group-1",
          name: "Accessibility",
          facilities: [
            {
              id: "g1-i1",
              name: "TV with subtitles",
              facilityIcon: "fa-solid fa-closed-captioning",
            },
          ],
        },
      ],
    },
    {
      id: "room-102",
      name: "Standard City View",
      price: 1000000,
      area: 28,
      beds: [{ id: "bed-2", name: "2 Single Beds" }],
      FacilitesGroup: [
        {
          id: "group-2",
          name: "Bathroom & Toiletries",
          facilities: [
            { id: "g2-i1", name: "Shower", facilityIcon: "fa-solid fa-shower" },
            {
              id: "g2-i2",
              name: "Hair dryer",
              facilityIcon: "fa-solid fa-wind",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="content py-10 border-t border-gray-300 m-10 justify-center flex flex-col items-center">
      <div className="info w-8/10">
        <div>
          <FilterCheckInHotel className={"mb-10"} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-4xl font-bold">The Evelyn Hot</p>
            <div className="flex items-center gap-2">
              <p>4.8</p>

              <StarRatingStatic starNumber={5} />

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
            <div className="flex gap-2 justify-start items-center">
              <IconButton icon="copy" buttonStyle="text"></IconButton>
              <IconButton
                icon="heart"
                iconColorActive="text-red-500"
                className="p-2 "
                iconSize={18}
              >
                Save
              </IconButton>
            </div>
            <div className="flex items-center gap-2">
              <p className="price text-3xl font-bold">$335</p>
              <Button variant="outline" typeButton="text" onClick={() => {}}>
                View Deal
              </Button>
            </div>
          </div>
        </div>

        <div className="img flex my-4 gap-1 w-full justify-center">
          <div className="photoMain w-9/12 h-[600px] overflow-hidden">
            <img
              src={
                "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg"
              }
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col w-2/12 gap-1 h-[600px]">
            <div className="traveler h-1/3 overflow-hidden">
              <img
                src={
                  "https://www.kayak.com/rimg/himg/b0/2c/df/leonardo-878836-186563354-395441.jpg?width=1366&height=768&crop=true"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="RoomSuite h-1/3 overflow-hidden">
              <img
                src={
                  "https://content.r9cdn.net/rimg/himg/b7/96/b8/leonardo-878836-186563362-407114.jpg?width=500&height=350&xhint=1620&yhint=1000&crop=true"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="video h-1/3 overflow-hidden">
              <img
                src={
                  "https://images.trvl-media.com/lodging/9000000/8090000/8082700/8082639/33e6873e.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 grid-rows-2">
          <div className="infodetail col-span-5 row-span-2 *:mb-3">
            <CardContent title="Introduce">
              <p>
                Get your trip off to a great start with a stay at this hotel,
                which offers free Wi-Fi in all rooms. Centrally located in New
                York (NY)'s Financial District, this property puts you close to
                exciting attractions and dining options. Don't leave before
                visiting the famous Central Park. Rated 3.5 stars, this
                high-quality property offers guests access to an on-site gym and
                restaurant.
              </p>
            </CardContent>

            <CardContent title="Highlight">
              <div className="grid grid-cols-5 mt-5">
                <IconLabel
                  Icon={<i className="fa-solid fa-thumbs-up"></i>}
                  Label=" Suitable for activities"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-bus"></i>}
                  Label=" 360 m from public transport"
                  Direct="column"
                  LabelLayout="center"
                  IconLayout="center"
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-shield"></i>}
                  Label=" Check-in [24 hours]"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-building-columns"></i>}
                  Label="More hygiene"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-bus"></i>}
                  Label="870m The National 9/11 Memorial & Museum"
                  Direct="column"
                  IconLayout="center"
                  LabelLayout="center"
                />
              </div>
            </CardContent>
            <CardContent title="Amenities">
              <div className="grid grid-cols-4 max-md:grid-cols-2">
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Free Wi-Fi"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Reception desk [24 hours]"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Fitness center"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Restaurant"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Bar"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Luggage storage"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Pets allowed"}
                />
                <IconLabel
                  Icon={<i className="fa-solid fa-check"></i>}
                  Label={"Rooftop area"}
                />
              </div>
            </CardContent>
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
            <Button
              rounded="full"
              size="sm"
              variant="outline"
              typeButton="filled"
            >
              All
            </Button>
            <Button
              rounded="full"
              size="sm"
              variant="outline"
            >
              1 Bed
            </Button>
            <Button
              rounded="full"
              size="sm"
              variant="outline"
            >
              2 Beds
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {rooms?.map((room) => {
              return <RoomCard key={room.id} room={room} />;
            })}
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default HotelDetail;
