import React, { useEffect, useState } from "react";
import { Button } from "../../../component/UI";
import FilterCheckInHotel from "../../../component/filter-component/SearchFilterHotel";
import Comment from "../../Comment";
import CardContent from "../../../component/service's-body/CardContent";
import IconLabel from "../../../component/UI/IconLabel";
import RoomCard from "./RoomCard";
import InfoService from "../../../component/infoService";
import ImageSlide from "../../../component/ImageSlide";
import { hotel } from "../../../model/hotel/hotel";
import { useParams } from "react-router";
import { Amenity } from "../../../model/facility";
import Reviews from "../../Auths/InfoClient/ReviewPost/Reviews";
import { Icon } from "@mui/material";
import Rooms from "./Rooms";

const hotels: hotel[] = [
  {
    service: {
      serviceID: "service-1",
      name: "Hotel Service",
      address: "123 Main St, City, Country",
      totalImages: 5,
      totalReviews: 5,
      totalImageReviews: 16,
      Images: [
        {
          serviceID: "service-1",
          id: "post-101",
          images: [
            {
              imageID: "img-1",
              url: "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg",
              description: "Spacious lobby lounge with modern design",
              altText: "Hotel lobby lounge",
            },
            {
              imageID: "img-2",
              url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1",
              description: "Luxury hotel room with comfortable bed",
              altText: "Deluxe room interior",
            },
          ],
          user: {
            userID: "user-55",
            name: "Nguyen Van A",
            userName: "",
            email: "",
          },
          createAt: new Date("2025-08-17T09:00:00Z"),
        },
        {
          serviceID: "service-2",
          id: "post-101",
          images: [
            {
              imageID: "img-1",
              url: "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg",
              description: "Spacious lobby lounge with modern design",
              altText: "Hotel lobby lounge",
            },
            {
              imageID: "img-2",
              url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1",
              description: "Luxury hotel room with comfortable bed",
              altText: "Deluxe room interior",
            },
          ],
          user: {
            userID: "user-55",
            name: "Nguyen Van B",
            userName: "",
            email: "",
          },
          createAt: new Date("2025-08-17T09:00:00Z"),
        },
      ],
      ratingAvg:4.5,
      contact: {
        contactID: "contact-1",
        phone: "123-456-7890",
        email: "info@hotelservice.com",
        website: "www.hotelservice.com",
      },
      reviewQuantity: 10,
      reviewsAndPostPhotos: [
        {
          rating: 5,
          title: "Title reviews",
          createAt: new Date(),
          comment: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa inventore accusantium quas sed quos amet incidunt magni beatae distinctio alias, asperiores aut est consectetur eveniet quidem. Hic exercitationem quos ullam!`,
          id: "",
          serviceID: "",
          user: {
            userID: "",
            userName: "",
            name: "sups",
            email: "example@gmail.com",
            avatar: {
              altText: "",
              description: "",
              imageID: "",
              url: "https://preview.redd.it/i-finished-bocchi-the-rock-and-it-is-the-best-thing-i-have-v0-ho5ub4gfzmuc1.jpeg?width=640&crop=smart&auto=webp&s=996908c0ddb613bab3749aa7fce007e15f6ed5ea",
            },
          },
          images: [
            {
              url: "https://www.everlyhotelhollywood.com/images/1700-960/lobby-lounge-everly-hollywood-101cd4b4.jpg",
              imageID: "",
              description: "",
              altText: "",
            },
            {
              url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1",
              imageID: "",
              description: "",
              altText: "",
            },
            {
              url: "https://www.maritim.com/fileadmin/_processed_/0/1/csm_Bpa_363_Superior_500a005b62.jpg",
              imageID: "",
              description: "",
              altText: "",
            },
            {
              url: "https://www.hoteldel.com/wp-content/uploads/2021/01/hotel-del-coronado-views-suite-K1TOS1-K1TOJ1-1600x900-1.jpg",
              imageID: "",
              description: "",
              altText: "",
            },
            {
              url: "https://a25hotel.com/images/products/2025/03/15/large/TR6.jpg",
              imageID: "",
              description: "",
              altText: "",
            },
            {
              url: "https://www.navadahotel.com/FileStorage/Room/Thumbnail/DSC_2755-HDR.jpg",
              imageID: "",
              description: "",
              altText: "",
            },
            {
              url: "https://www.vandahotel.vn/wp-content/uploads/sites/100/2016/12/deluxe-river-view-double-2.jpg",
              imageID: "",
              description: "",
              altText: "",
            },
          ],
        },
        {
          id: "r1",
          serviceID: "s1",
          rating: 5,
          title: "Tuyệt vời!",
          createAt: new Date("2025-08-16T09:30:00Z"),
          comment:
            "Khách sạn sạch sẽ, nhân viên thân thiện và luôn hỗ trợ nhiệt tình. Phòng được dọn gọn gàng mỗi ngày, bữa sáng đa dạng, mình cảm thấy rất hài lòng khi lưu trú tại đây.",
          user: {
            userID: "u1",
            userName: "traveler01",
            name: "Nguyễn Văn A",
            email: "a@example.com",
            avatar: {
              imageID: "img1",
              url: "https://i.pravatar.cc/150?img=1",
              altText: "avatar",
              description: "Ảnh đại diện",
            },
          },
          images: [
            {
              imageID: "revimg1",
              url: "https://picsum.photos/id/1011/800/600",
              altText: "hotel view",
              description: "Khung cảnh khách sạn",
            },
          ],
        },
        {
          id: "r2",
          serviceID: "s2",
          rating: 4,
          title: "Khá tốt",
          createAt: new Date("2025-08-16T09:30:00Z"),
          comment:
            "Phòng rộng rãi, giường thoải mái nhưng đôi lúc hơi ồn vì gần đường chính. Tuy nhiên bù lại thì vị trí thuận tiện, đi lại dễ dàng, nhân viên phục vụ tận tình và chu đáo.",
          user: {
            userID: "u2",
            userName: "sups",
            name: "Sup Sup",
            email: "sup@example.com",
            avatar: {
              imageID: "img2",
              url: "https://i.pravatar.cc/150?img=2",
              altText: "avatar",
              description: "Ảnh đại diện",
            },
          },
          images: [
            {
              imageID: "revimg2",
              url: "https://picsum.photos/id/1015/800/600",
              altText: "room interior",
              description: "Bên trong phòng",
            },
            {
              imageID: "revimg3",
              url: "https://picsum.photos/id/1021/800/600",
              altText: "pool",
              description: "Hồ bơi",
            },
          ],
        },
        {
          rating: 4,
          title: "Khách sạn tuyệt vời",
          createAt: new Date(),
          comment:
            "Phòng rộng rãi, nhân viên thân thiện và luôn hỗ trợ khách. Khu vực sảnh sang trọng, nhiều dịch vụ tiện ích. Mình cảm thấy hài lòng và chắc chắn sẽ quay lại khi có dịp.",
          id: "",
          serviceID: "",
          user: {
            userID: "user-2",
            userName: "johndoe",
            name: "John Doe",
            email: "john@example.com",
            avatar: {
              altText: "avatar john",
              description: "",
              imageID: "avatar-2",
              url: "https://randomuser.me/api/portraits/men/75.jpg",
            },
          },
          images: [
            {
              url: "https://a25hotel.com/images/products/2025/03/15/large/TR6.jpg",
              imageID: "img-100",
              description: "Buffet sáng",
              altText: "Buffet sáng tại khách sạn",
            },
          ],
        },
        {
          id: "r1",
          rating: 5,
          title: "Amazing stay!",
          createAt: new Date("2025-08-10T12:30:00Z"),
          comment:
            "The hotel exceeded my expectations. The staff were super friendly, the room was spotless, and the breakfast was delicious. Everything was well organized, making my stay unforgettable.",
          serviceID: "s1",
          user: {
            userID: "u1",
            userName: "traveler01",
            name: "John Doe",
            email: "john@example.com",
            avatar: {
              altText: "Profile picture of John Doe",
              description: "A smiling man wearing sunglasses",
              imageID: "img-u1",
              url: "https://randomuser.me/api/portraits/men/32.jpg",
            },
          },
          images: [
            {
              url: "https://a25hotel.com/images/products/2025/03/15/large/TR6.jpg",
              imageID: "img-r1-1",
              description: "Deluxe room view",
              altText: "hotel room",
            },
          ],
        },
        {
          id: "r2",
          rating: 4,
          title: "Great value for money",
          createAt: new Date("2025-08-11T09:15:00Z"),
          comment:
            "The location is perfect, just a few minutes from the city center. Rooms are small but cozy, breakfast was tasty, and the staff were extremely helpful throughout my stay.",
          serviceID: "s1",
          user: {
            userID: "u2",
            userName: "sophie_l",
            name: "Sophie Lee",
            email: "sophie@example.com",
            avatar: {
              altText: "Profile picture of Sophie",
              description: "Young woman with short hair",
              imageID: "img-u2",
              url: "https://randomuser.me/api/portraits/women/44.jpg",
            },
          },
          images: [
            {
              url: "https://a25hotel.com/images/products/2025/03/15/large/TR6.jpg",
              imageID: "img-r2-1",
              description: "Hotel entrance at night",
              altText: "hotel entrance",
            },
          ],
        },
        {
          id: "r3",
          rating: 3,
          title: "Good but noisy",
          createAt: new Date("2025-08-12T15:45:00Z"),
          comment:
            "The room was clean and the staff were polite, but the noise from the street made it hard to sleep. Overall service was decent and facilities were fine, but I’d prefer a higher floor next time.",
          serviceID: "s1",
          user: {
            userID: "u3",
            userName: "michael_b",
            name: "Michael Brown",
            email: "michael@example.com",
            avatar: {
              altText: "Profile picture of Michael",
              description: "Man with beard",
              imageID: "img-u3",
              url: "https://randomuser.me/api/portraits/men/67.jpg",
            },
          },
          images: [
            {
              url: "https://www.vandahotel.vn/wp-content/uploads/sites/100/2016/12/deluxe-river-view-double-2.jpg",
              imageID: "img-r3-1",
              description: "Street view from the balcony",
              altText: "street view",
            },
          ],
        },
        {
          id: "r4",
          rating: 5,
          title: "Unforgettable experience",
          createAt: new Date("2025-08-13T18:20:00Z"),
          comment:
            "This was one of the best trips I’ve ever had. The hotel staff arranged everything perfectly, from airport pickup to daily tours. Every detail was cared for, making the trip unforgettable.",
          serviceID: "s1",
          user: {
            userID: "u4",
            userName: "anna_travels",
            name: "Anna Johnson",
            email: "anna@example.com",
            avatar: {
              altText: "Profile picture of Anna",
              description: "Smiling woman with long hair",
              imageID: "img-u4",
              url: "https://randomuser.me/api/portraits/women/12.jpg",
            },
          },
          images: [
            {
              url: "https://www.vandahotel.vn/wp-content/uploads/sites/100/2016/12/deluxe-river-view-double-2.jpg",
              imageID: "img-r4-1",
              description: "View of the pool",
              altText: "hotel pool",
            },
          ],
        },
        {
          id: "r5",
          rating: 2,
          title: "Not as expected",
          createAt: new Date("2025-08-14T08:00:00Z"),
          comment:
            "Honestly, I was disappointed. The photos online looked much better. The room smelled damp, Wi-Fi was slow, and facilities seemed outdated. I hope the hotel will renovate in the future.",
          serviceID: "s1",
          user: {
            userID: "u5",
            userName: "kevin_r",
            name: "Kevin Roberts",
            email: "kevin@example.com",
            avatar: {
              altText: "Profile picture of Kevin",
              description: "Young man with cap",
              imageID: "img-u5",
              url: "https://randomuser.me/api/portraits/men/20.jpg",
            },
          },
          images: [
            {
              url: "https://www.vandahotel.vn/wp-content/uploads/sites/100/2016/12/deluxe-river-view-double-2.jpg",
              imageID: "img-r5-1",
              description: "Small hotel room",
              altText: "room interior",
            },
          ],
        },
      ],
    },
    amenities: [
      { amenityID: "1", icon: "wifi", name: "Free Wi-Fi" },
      { amenityID: "2", icon: "car", name: "Free Parking" },
      { amenityID: "3", icon: "swimming-pool", name: "Swimming Pool" },
      { amenityID: "4", icon: "dumbbell", name: "Fitness Center" },
      { amenityID: "5", icon: "spa", name: "Spa" },
      { amenityID: "6", icon: "utensils", name: "Restaurant" },
      { amenityID: "7", icon: "coffee", name: "Coffee Shop" },
      { amenityID: "8", icon: "cocktail", name: "Bar" },
      { amenityID: "9", icon: "concierge-bell", name: "Room Service" },
      { amenityID: "10", icon: "snowflake", name: "Air Conditioning" },
      { amenityID: "11", icon: "tv", name: "Flat-Screen TV" },
      { amenityID: "12", icon: "bed", name: "King Size Bed" },
      { amenityID: "13", icon: "bath", name: "Private Bathroom" },
      { amenityID: "14", icon: "shower", name: "Hot Shower" },
      { amenityID: "15", icon: "tshirt", name: "Laundry Service" },
      { amenityID: "16", icon: "child", name: "Kids Club" },
      { amenityID: "17", icon: "dog", name: "Pet Friendly" },
      { amenityID: "18", icon: "couch", name: "Lounge Area" },
      { amenityID: "19", icon: "leaf", name: "Garden" },
    ],
    highLight: [
      {
        amenityID: "1",
        name: "Suitable for activities",
        icon: "thumbs-up",
      },
      {
        amenityID: "2",
        name: "360 m from public transport",
        icon: "bus-simple",
      },
      {
        amenityID: "3",
        name: "Check-in [24 hours]",
        icon: "shield",
      },
      {
        amenityID: "4",
        name: "More hygiene",
        icon: "building-columns",
      },
      {
        amenityID: "5",
        name: "870m The National 9/11 Memorial & Museum",
        icon: "bus",
      },
    ],
    rooms: [
      {
        roomID: "room-101",
        name: "Deluxe Sea View Room",
        price: 1500000,
        area: 35,
        beds: [{ id: "bed-1", name: "1 King Bed", quanlity: 1 }],
        facilities: [
          {
            facilityID: "f1",
            name: "Accessibility",
            amenities: [
              { amenityID: "a1", name: "TV with subtitles", icon: "tv" },
              {
                amenityID: "a2",
                name: "Wheelchair accessible",
                icon: "wheelchair",
              },
            ],
          },
          {
            facilityID: "f2",
            name: "Internet",
            amenities: [
              { amenityID: "a3", name: "Free WiFi", icon: "wifi" },
              {
                amenityID: "a4",
                name: "High-speed Ethernet",
                icon: "ethernet",
              },
            ],
          },
        ],
        images:[{
          imageID: "img-101-1",
          url: "/images/rooms/deluxe1.jpg",
          altText: "Deluxe Sea View Room",
          description: ""
        },
        {
          imageID: "img-101-2",
          url: "/images/rooms/deluxe2.jpg",
          altText: "Deluxe Sea View Bathroom",
          description: ""
        }],
        quantity: 10,
      },

      {
        roomID: "room-102",
        name: "Superior Garden View Room",
        price: 1200000,
        area: 30,
        beds: [{ id: "bed-2", name: "2 Twin Beds", quanlity: 1 }],
        facilities: [
          {
            facilityID: "f3",
            name: "Bathroom",
            amenities: [
              { amenityID: "a5", name: "Hot shower", icon: "shower" },
              { amenityID: "a6", name: "Bathtub", icon: "bath" },
            ],
          },
          {
            facilityID: "f4",
            name: "Entertainment",
            amenities: [
              { amenityID: "a7", name: "Smart TV", icon: "tv" },
              { amenityID: "a8", name: "Bluetooth speaker", icon: "speaker" },
            ],
          },
        ],
                images:[{
          imageID: "img-101-1",
          url: "/images/rooms/deluxe1.jpg",
          altText: "Deluxe Sea View Room",
          description: ""
        },
        {
          imageID: "img-101-2",
          url: "/images/rooms/deluxe2.jpg",
          altText: "Deluxe Sea View Bathroom",
          description: ""
        }],
        quantity: 8,
      },

      {
        roomID: "room-103",
        name: "Family Suite",
        price: 2500000,
        area: 55,
        beds: [
          { id: "bed-3", name: "2 Queen Beds", quanlity: 1 },
          { id: "bed-4", name: "1 Sofa Bed", quanlity: 1 },
        ],
        facilities: [
          {
            facilityID: "f5",
            name: "Kitchen",
            amenities: [
              { amenityID: "a9", name: "Microwave", icon: "microwave" },
              { amenityID: "a10", name: "Mini-fridge", icon: "refrigerator" },
            ],
          },
          {
            facilityID: "f6",
            name: "Bathroom",
            amenities: [
              { amenityID: "a11", name: "Jacuzzi", icon: "hot-tub" },
              { amenityID: "a12", name: "Hair dryer", icon: "dryer" },
            ],
          },
        ],
                images:[{
          imageID: "img-101-1",
          url: "/images/rooms/deluxe1.jpg",
          altText: "Deluxe Sea View Room",
          description: ""
        },
        {
          imageID: "img-101-2",
          url: "/images/rooms/deluxe2.jpg",
          altText: "Deluxe Sea View Bathroom",
          description: ""
        }],
        quantity: 5,
      },

      {
        roomID: "room-104",
        name: "Presidential Suite",
        price: 5000000,
        area: 120,
        beds: [
          { id: "bed-5", name: "1 Super King Bed", quanlity: 1 },
          { id: "bed-6", name: "2 Twin Beds", quanlity: 1 },
        ],
        facilities: [
          {
            facilityID: "f7",
            name: "Luxury",
            amenities: [
              { amenityID: "a13", name: "Private pool", icon: "pool-8-ball" },
              { amenityID: "a14", name: "Personal butler", icon: "user" },
            ],
          },
          {
            facilityID: "f8",
            name: "Entertainment",
            amenities: [
              { amenityID: "a15", name: "Home theater", icon: "tv" },
              { amenityID: "a16", name: "Gaming console", icon: "gamepad" },
            ],
          },
        ],
                images:[{
          imageID: "img-101-1",
          url: "/images/rooms/deluxe1.jpg",
          altText: "Deluxe Sea View Room",
          description: ""
        },
        {
          imageID: "img-101-2",
          url: "/images/rooms/deluxe2.jpg",
          altText: "Deluxe Sea View Bathroom",
          description: ""
        }],
        quantity: 2,
      },

      {
        roomID: "room-105",
        name: "Standard City View",
        price: 900000,
        area: 25,
        beds: [{ id: "bed-7", name: "1 Queen Bed", quanlity: 1 }],
        facilities: [
          {
            facilityID: "f9",
            name: "Basic",
            amenities: [
              { amenityID: "a17", name: "Air conditioning", icon: "wind" },
              { amenityID: "a18", name: "Desk", icon: "briefcase" },
            ],
          },
          {
            facilityID: "f10",
            name: "Bathroom",
            amenities: [
              { amenityID: "a19", name: "Rain shower", icon: "cloud-rain" },
              { amenityID: "a20", name: "Free toiletries", icon: "gift" },
            ],
          },
        ],
                images:[{
          imageID: "img-101-1",
          url: "https://media.istockphoto.com/id/174767532/photo/hotel-room.jpg?s=612x612&w=0&k=20&c=2BCNeFcX5PGzCxfZKXewhI_y2C9R7Jw_tzVYCXmRRCE=",
          altText: "Deluxe Sea View Room",
          description: ""
        },
        {
          imageID: "img-101-2",
          url: "https://media.istockphoto.com/id/174767532/photo/hotel-room.jpg?s=612x612&w=0&k=20&c=2BCNeFcX5PGzCxfZKXewhI_y2C9R7Jw_tzVYCXmRRCE=",
          altText: "Deluxe Sea View Bathroom",
          description: ""
        }],
        quantity: 15,
      },

      {
        roomID: "room-106",
        name: "Honeymoon Suite",
        price: 3000000,
        area: 60,
        beds: [
          { id: "bed-8", name: "1 King Bed", quanlity: 1 },
          { id: "bed-9", name: "1 Sofa Bed", quanlity: 1 },
        ],
        facilities: [
          {
            facilityID: "f11",
            name: "Romantic",
            amenities: [
              { amenityID: "a21", name: "Private balcony", icon: "home" },
              { amenityID: "a22", name: "Ocean view", icon: "sun" },
            ],
          },
          {
            facilityID: "f12",
            name: "Bathroom",
            amenities: [
              { amenityID: "a23", name: "Jacuzzi", icon: "hot-tub" },
              { amenityID: "a24", name: "Candles & flowers", icon: "flower" },
            ],
          },
        ],
                images:[{
          imageID: "img-101-1",
          url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/438255871.jpg?k=9a99f7d08088d8f480bf9a0f6ed29accd55da853e0a216e57102111d10ae40d0&o=&hp=1",
          altText: "Deluxe Sea View Room",
          description: ""
        },
        {
          imageID: "img-101-2",
          url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/438255871.jpg?k=9a99f7d08088d8f480bf9a0f6ed29accd55da853e0a216e57102111d10ae40d0&o=&hp=1",
          altText: "Deluxe Sea View Bathroom",
          description: ""
        }],
        quantity: 4,
      },
    ],
    introduce: ` Get your trip off to a great start with a stay at this hotel,
                  which offers free Wi-Fi in all rooms. Centrally located in New
                  York (NY)'s Financial District, this property puts you close
                  to exciting attractions and dining options. Don't leave before
                  visiting the famous Central Park. Rated 3.5 stars, this
                  high-quality property offers guests access to an on-site gym
                  and restaurant.`,
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
  }, []);

  return (
    <div className="container p-5">
      <div className="w-full">
        <FilterCheckInHotel className={"mb-10"} />
      </div>

      <div className="contain justify-center flex flex-col items-center">
        <div className="info-content">
          <div className="info-contact">
            {hotel && <InfoService service={hotel.service} />}
            <div className="image-slide my-5">
              {hotel?.service.Images && (
                <ImageSlide postPhotos={hotel.service.Images} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-10 grid-rows-2">
            <div className="infodetail col-span-6 row-span-2 *:mb-3">
              <CardContent title="Giới thiệu" variant="outline">
                <p className="text-sm">{hotel?.introduce}</p>
              </CardContent>

              <CardContent title="Mục đặc biệt" variant="outline">
                <div className="grid grid-cols-5 mt-5">
                  {hotel?.highLight.map((item: Amenity) => {
                    return (
                      <IconLabel
                        key={item.amenityID}
                        name={item.icon}
                        Label={item.name}
                        Direct="column"
                        IconLayout="center"
                        LabelLayout="center"
                      />
                    );
                  })}
                </div>
              </CardContent>
              <CardContent title="Tiện ích" variant="outline">
                <div className="grid grid-cols-5 max-md:grid-cols-2 gap-3">
                  {hotel?.amenities.map((item: Amenity) => {
                    return (
                      <IconLabel
                        key={item.amenityID}
                        name={item.icon}
                        Label={item.name}
                        Direct="row"
                        IconLayout="center"
                        LabelLayout="center"
                      />
                    );
                  })}
                </div>
              </CardContent>
            </div>
            <div className="locationAndReview col-span-4 row-span-2 *:mb-3 flex flex-col px-4">
              <div className="location w-full h-full p-4 rounded border border-gray-200 shadow"></div>
            </div>
          </div>
        </div>
      </div>

      <Rooms rooms={hotel?.rooms}/>


      {hotel?.service.reviewsAndPostPhotos && (
        <Comment reviewAndPost={hotel?.service.reviewsAndPostPhotos} />
      )}
    </div>
  );
};

export default HotelDetail;
