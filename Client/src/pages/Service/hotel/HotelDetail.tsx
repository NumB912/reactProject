import React, { useEffect, useState } from "react";
import { Button } from "../../../component/UI";
import FilterCheckInHotel from "../../../component/FilterComponent/SearchFilterHotel";
import Comment from "../../Comment";
import CardContent from "../../../component/CardContent";
import IconLabel from "../../../component/UI/IconLabel";
import RoomCard from "./RoomCard";
import InfoService from "../../../component/infoService";
import ImageSlide from "../../../component/ImageSlide";
import { hotel } from "../../../model/hotel/hotel";
import { useParams } from "react-router";
import { Amenity } from "../../../model/facility";
import Reviews from "../../Auths/InfoClient/ReviewPost/Reviews";

const hotels: hotel[] = [
  {
    service: {
      serviceID: "service-1",
      name: "Hotel Service",
      address: "123 Main St, City, Country",
      totalImages: 5,
      totalReviews: 5,
      totalImageReviews: 16,
      Images: [{
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
      },{
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
      }],
      rating: 4.5,
      ratingQuantity: 0,
      contact: {
        contactID: "contact-1",
        phone: "123-456-7890",
        email: "info@hotelservice.com",
        website: "www.hotelservice.com",
      },
      reviewQuantity: 0,
      reviewsAndPostPhotos: [
        {
          rating: 5,
          title: "Title reviews",
          createAt: new Date(),
          comment: `      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa inventore accusantium quas sed quos amet incidunt magni beatae distinctio alias, asperiores aut est consectetur eveniet quidem. Hic exercitationem quos ullam!
`,
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
          comment: "Khách sạn sạch sẽ, nhân viên thân thiện.",
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
          comment: "Phòng rộng rãi nhưng hơi ồn.",
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
          comment: "Phòng rộng rãi, nhân viên thân thiện.",
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
            "The hotel exceeded my expectations. The staff were super friendly, the room was spotless, and the breakfast was delicious. I’ll definitely come back!",
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
            "The location is perfect, just a few minutes from the city center. Rooms are a bit small but very cozy. Totally worth the price.",
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
            "The room was clean and the staff were polite, but the noise from the street made it hard to sleep. Might stay again if I get a room on a higher floor.",
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
            "This was one of the best trips I’ve ever had. The hotel staff arranged everything perfectly, from airport pickup to daily tours. Worth every penny!",
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
            "Honestly, I was a bit disappointed. The photos online looked much better than reality. The room smelled damp and Wi-Fi was very slow.",
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
    amenities: [],
    highLight: [{ amenityID: "a10", icon: "address-book", name: "s" }],
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
    <div className="container">
      <div className="w-full">
        <FilterCheckInHotel className={"mb-10"} />
      </div>

      <div className="contain justify-center flex flex-col items-center">
        <div className="info-content">
          <div className="info-contact">
            {hotel && <InfoService service={hotel.service} />}
            <div className="image-slide my-5">
              {hotel?.service.Images && (
                <ImageSlide
                  reviewsAndPhotoData={hotel.service.Images}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-7 grid-rows-2">
            <div className="infodetail col-span-5 row-span-2 *:mb-3">
              <CardContent title="Introduce">
                <p>{hotel?.introduce}</p>
              </CardContent>

              <CardContent title="Highlight">
                <div className="grid grid-cols-6 mt-5">
                  <IconLabel
                    name="thumbs-up"
                    Label=" Suitable for activities"
                    Direct="column"
                    IconLayout="center"
                    LabelLayout="center"
                  />
                  <IconLabel
                    name="bus-simple"
                    Label=" 360 m from public transport"
                    Direct="column"
                    LabelLayout="center"
                    IconLayout="center"
                  />
                  <IconLabel
                    name="shield"
                    Label=" Check-in [24 hours]"
                    Direct="column"
                    IconLayout="center"
                    LabelLayout="center"
                  />
                  <IconLabel
                    name="building-columns"
                    Label="More hygiene"
                    Direct="column"
                    IconLayout="center"
                    LabelLayout="center"
                  />
                  <IconLabel
                    name="bus"
                    Label="870m The National 9/11 Memorial & Museum"
                    Direct="column"
                    IconLayout="center"
                    LabelLayout="center"
                  />
                </div>
              </CardContent>
              <CardContent title="Amenities">
                <div className="grid grid-cols-6 max-md:grid-cols-2">
                  <IconLabel Label={"Free Wi-Fi"} />
                  <IconLabel Label={"Reception desk [24 hours]"} />
                  <IconLabel Label={"Fitness center"} />
                  <IconLabel Label={"Restaurant"} />
                  <IconLabel Label={"Bar"} />
                  <IconLabel Label={"Luggage storage"} />
                  <IconLabel Label={"Pets allowed"} />
                  <IconLabel Label={"Rooftop area"} />
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
        </div>
      </div>

      <div className="w-full">
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
          <Button rounded="full" size="sm" variant="outline" typeButton="text">
            1 Bed
          </Button>
          <Button rounded="full" size="sm" variant="outline" typeButton="text">
            2 Beds
          </Button>
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-5">
          {hotel?.rooms?.map((room) => {
            return <RoomCard key={room.roomID} room={room} />;
          })}
        </div>
      </div>
      {hotel?.service.reviewsAndPostPhotos && <Comment reviewAndPost={hotel?.service.reviewsAndPostPhotos}/>}
    </div>
  );
};

export default HotelDetail;
