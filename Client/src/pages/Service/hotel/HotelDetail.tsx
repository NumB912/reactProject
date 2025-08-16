import React, { useEffect, useState } from "react";
import { Button, ButtonIcon } from "../../../component/UI";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router";
import { FaHeart } from "react-icons/fa6";
import FilterCheckInHotel from "../../../component/FilterComponent/SearchFilterHotel";
import Comment from "../../Comment";
import { StarRatingStatic } from "../../../component";
import CardContent from "../../../component/CardContent";
import IconLabel from "../../../component/UI/IconLabel";
import RoomCard from "./RoomCard";
import { Room } from "./modal/Room";
import InfoService from "../../../component/infoService";
import ImageSlide from "../../../component/ImageSlide";
import { hotel } from "../../../model/hotel/hotel";
import Service from "../../Service";
import { u } from "react-router/dist/development/route-data-B9_30zbP";

const hotels: hotel[] = [
  {
    service: {
      serviceID: "service-1",
      name: "Hotel Service",
      address: "123 Main St, City, Country",
      Images: [
        {
          url: "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg",
          imageID: "",
          description: "",
          altText: "",
        },
        {
          url: "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg",
          imageID: "",
          description: "",
          altText: "",
        },
        {
          url: "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg",
          imageID: "",
          description: "",
          altText: "",
        },
      ],
      rating: 4.5,
      ratingQuantity: 0,
      contact: {
        contactID: "contact-1",
        phone: "123-456-7890",
        email: "info@hotelservice.com",
        website: "www.hotelservice.com",
      },
      reviewQuantity: 0,
      review: "",
    },
    rooms: [
      {
        roomID: "room-101",
        name: "Deluxe Sea View Room",
        price: 1500000,
        area: 35,
    beds: [
      { id: "bed-1", name: "1 King Bed" }
    ],
    facilities: [
      {
        facilityID: "f1",
        name: "Accessibility",
        amenities: [
          { amenityID: "a1", name: "TV with subtitles", icon: "tv" },
          { amenityID: "a2", name: "Wheelchair accessible", icon: "wheelchair" }
        ]
      },
      {
        facilityID: "f2",
        name: "Internet",
        amenities: [
          { amenityID: "a3", name: "Free WiFi", icon: "wifi" },
          { amenityID: "a4", name: "High-speed Ethernet", icon: "ethernet" }
        ]
      }
    ],
    quantity: 10,
  },

  {
    roomID: "room-102",
    name: "Superior Garden View Room",
    price: 1200000,
    area: 30,
    beds: [
      { id: "bed-2", name: "2 Twin Beds" }
    ],
    facilities: [
      {
        facilityID: "f3",
        name: "Bathroom",
        amenities: [
          { amenityID: "a5", name: "Hot shower", icon: "shower" },
          { amenityID: "a6", name: "Bathtub", icon: "bath" }
        ]
      },
      {
        facilityID: "f4",
        name: "Entertainment",
        amenities: [
          { amenityID: "a7", name: "Smart TV", icon: "tv" },
          { amenityID: "a8", name: "Bluetooth speaker", icon: "speaker" }
        ]
      }
    ],
    quantity: 8,
  },

  {
    roomID: "room-103",
    name: "Family Suite",
    price: 2500000,
    area: 55,
    beds: [
      { id: "bed-3", name: "2 Queen Beds" },
      { id: "bed-4", name: "1 Sofa Bed" }
    ],
    facilities: [
      {
        facilityID: "f5",
        name: "Kitchen",
        amenities: [
          { amenityID: "a9", name: "Microwave", icon: "microwave" },
          { amenityID: "a10", name: "Mini-fridge", icon: "refrigerator" }
        ]
      },
      {
        facilityID: "f6",
        name: "Bathroom",
        amenities: [
          { amenityID: "a11", name: "Jacuzzi", icon: "hot-tub" },
          { amenityID: "a12", name: "Hair dryer", icon: "dryer" }
        ]
      }
    ],
    quantity: 5,
  },

  {
    roomID: "room-104",
    name: "Presidential Suite",
    price: 5000000,
    area: 120,
    beds: [
      { id: "bed-5", name: "1 Super King Bed" },
      { id: "bed-6", name: "2 Twin Beds" }
    ],
    facilities: [
      {
        facilityID: "f7",
        name: "Luxury",
        amenities: [
          { amenityID: "a13", name: "Private pool", icon: "pool-8-ball" },
          { amenityID: "a14", name: "Personal butler", icon: "user" }
        ]
      },
      {
        facilityID: "f8",
        name: "Entertainment",
        amenities: [
          { amenityID: "a15", name: "Home theater", icon: "tv" },
          { amenityID: "a16", name: "Gaming console", icon: "gamepad" }
        ]
      }
    ],
    quantity: 2,
  },

  {
    roomID: "room-105",
    name: "Standard City View",
    price: 900000,
    area: 25,
    beds: [
      { id: "bed-7", name: "1 Queen Bed" }
    ],
    facilities: [
      {
        facilityID: "f9",
        name: "Basic",
        amenities: [
          { amenityID: "a17", name: "Air conditioning", icon: "wind" },
          { amenityID: "a18", name: "Desk", icon: "briefcase" }
        ]
      },
      {
        facilityID: "f10",
        name: "Bathroom",
        amenities: [
          { amenityID: "a19", name: "Rain shower", icon: "cloud-rain" },
          { amenityID: "a20", name: "Free toiletries", icon: "gift" }
        ]
      }
    ],
    quantity: 15,
  },

  {
    roomID: "room-106",
    name: "Honeymoon Suite",
    price: 3000000,
    area: 60,
    beds: [
      { id: "bed-8", name: "1 King Bed" },
      { id: "bed-9", name: "1 Sofa Bed" }
    ],
    facilities: [
      {
        facilityID: "f11",
        name: "Romantic",
        amenities: [
          { amenityID: "a21", name: "Private balcony", icon: "home" },
          { amenityID: "a22", name: "Ocean view", icon: "sun" }
        ]
      },
      {
        facilityID: "f12",
        name: "Bathroom",
        amenities: [
          { amenityID: "a23", name: "Jacuzzi", icon: "hot-tub" },
          { amenityID: "a24", name: "Candles & flowers", icon: "flower" }
        ]
      }
    ],
    quantity: 4,
  }]

  },
];

const HotelDetail = () => {
  const { hotelID } = useParams();
  const [hotel, setHotel] = useState<hotel | null>(null);

  useEffect(() => {
    const foundHotel = hotels.find((h) => h.service.serviceID === hotelID);
    if (foundHotel) {
      setHotel(foundHotel);
    }
  }, [hotelID]);

  return (
    <div className="container justify-center flex flex-col items-center">
      <div className="info content p-4">
        <div className="search-filter">
          <FilterCheckInHotel className={"mb-10"} />
        </div>

        <div className="info-contact">
          {hotel && <InfoService service={hotel.service} />}
        </div>

        <div className="image-slide my-5">
          <ImageSlide images={hotel?.service.Images || []} />
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
                <p className="text-xl font-bold">
                  {hotel?.service.rating} great
                </p>
                <p className="text-gray-500 text-sm">
                  <i className="fa-solid fa-check-double"></i>
                  {hotel?.service.reviewQuantity} reviews
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
              typeButton="text"
            >
              1 Bed
            </Button>
            <Button
              rounded="full"
              size="sm"
              variant="outline"
              typeButton="text"
            >
              2 Beds
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {hotel?.rooms?.map((room) => {
              return <RoomCard key={room.roomID} room={room} />;
            })}
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default HotelDetail;
