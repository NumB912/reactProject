import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../../../component/UI";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../../API/api";
import { room } from "../../../model/hotel/room/room";
import { Hotel } from "../../../model/hotel/hotel";
import { Check } from "@mui/icons-material";
import {
  useCalendarHotel,
  usePassengerCar,
  useTravelerHotel,
} from "../../../store";
import useStateLogin from "../../../store/LoginStore/login_store";

const BASE_IMAGE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const HotelBook: React.FC = () => {
  const { hotelID, roomID } = useParams<{ hotelID: string; roomID: string }>();
  const navigate = useNavigate()

  const {user_id} = useStateLogin()
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");

  const [hotel, setHotel] = useState<Hotel>();
  const [room, setRoom] = useState<room>();
  const [loading, setLoading] = useState<boolean>(true);
  const { dateSelectedCheckOut, dateSelectedBook } = useCalendarHotel();
  const { adultQuantity, roomQuantity, childrenQuantity } = useTravelerHotel();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numberPhone: "",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhone = (phone: string) => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone);
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setfirstName(value);

    setErrors((prev) => ({
      ...prev,
      firstName: value ? "" : "Tên không được để trống",
    }));
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);

    setErrors((prev) => ({
      ...prev,
      lastName: value ? "" : "Họ không được để trống",
    }));
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value) ? "" : "Email không hợp lệ",
    }));
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberPhone(value);

    setErrors((prev) => ({
      ...prev,
      numberPhone: validatePhone(value)
        ? ""
        : "Số điện thoại phải gồm 10–11 chữ số",
    }));
  };

  const submitPost = () => {
    api.post("/user/booking", {
      service_id:hotel?.id,
      service_item_id:room?.id,
      lastName:lastName,
      firstName:firstName,
      phone:numberPhone,
      check_in:dateSelectedBook,
      check_out:dateSelectedCheckOut,
      adult:adultQuantity,
      children:childrenQuantity,
      quantity:roomQuantity,
      user_id:user_id,
      email:email,
    }).then((res)=>{
      const payment = res.data
      if(!payment){
        return
      }

      navigate(`/payment/${payment.id}`)
    }).catch(error=>{
      console.log(`${error}`)
    });
  };

  const isFormValid =
    firstName && lastName && validateEmail(email) && validatePhone(numberPhone);

  useEffect(() => {
    if (!hotelID || !roomID) return;

    setLoading(true);
    api
      .get("/service/service-item-detail", {
        params: {
          service_id: hotelID,
          serviceItemId: roomID,
        },
      })
      .then((res) => {
        const { service, serviceItem } = res.data.data;
        setHotel(service);
        setRoom(serviceItem);
      })
      .catch((err) => {
        console.error("Failed to fetch hotel/room details:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hotelID, roomID]);

  if (loading) {
    return (
      <div className="container py-10 text-center">Đang tải thông tin...</div>
    );
  }

  if (!hotel || !room) {
    return (
      <div className="container py-10 text-center text-red-600">
        Không tìm thấy thông tin khách sạn hoặc phòng.
      </div>
    );
  }

  const fullAddress = `${hotel.location.location}, ${hotel.location.ward.fullName}, ${hotel.location.ward.province.fullName}`;

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="w-full flex items-center justify-center p-3 flex-wrap">
        <div className="flex w-full flex-row justify-between items-center relative mb-5">
          <div className="absolute w-full h-1 top-6 bg-gray-200 z-0"></div>
          <div className="absolute w-1/2 h-1 top-6 bg-blue-200 z-0"></div>

          <div className="booking z-10 flex flex-col justify-center items-center gap-2 relative">
            <div className="bg-black p-2 rounded-full text-center text-white font-bold border-4 border-white shadow">
              1. Thông tin dịch vụ
            </div>
          </div>

          <div className="booking z-10 flex flex-col justify-center items-center gap-2 relative">
            <div className="bg-black p-2 rounded-full text-center text-white font-bold border-4 border-white shadow">
              2. Thông tin đặt dịch vụ
            </div>
          </div>

          <div className="booking z-10 flex flex-col justify-center items-center gap-2 relative">
            <div className="bg-black p-2 rounded-full text-center text-white font-bold border-4 border-white shadow">
              3. Thanh toán
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] gap-6">
        <div className="flex flex-col gap-6">
          <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Tên người đặt</label>
                <input
                  type="text"
                  placeholder="Tên"
                  onChange={handleFirstName}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Họ người đặt</label>
                <input
                  type="text"
                  placeholder="Họ"
                  onChange={handleLastName}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                onChange={handleEmail}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <label className="text-sm font-semibold">Số điện thoại</label>
              <input
                type="tel"
                placeholder="0123456789"
                onChange={handlePhone}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.numberPhone && (
                <p className="text-red-500 text-sm">{errors.numberPhone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm">
            <h3 className="text-lg font-bold">{hotel.service_name}</h3>
            <p className="text-sm text-gray-600 mt-1">{fullAddress}</p>

            <div className="mt-4">
              <p className="text-sm font-semibold">Đánh giá</p>
              <div className="flex items-center gap-2 mt-1">
                <i className="fa-solid fa-star text-yellow-500"></i>
                <span className="font-medium">{hotel.rating ?? 0}</span>
                <span className="text-sm text-gray-600">Good</span>
                <span className="text-sm text-gray-500">
                  ({hotel.total_reviews ?? 0} đánh giá)
                </span>
              </div>

              <div className="grid grid-cols-2 w-full mt-5">
                <div className="w-fit">
                  <p className="font-bold">Ngày đặt</p>
                  <span>
                    {dateSelectedBook?.toLocaleString("vi-vn", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="w-fit">
                  <p className="font-bold">Ngày trả</p>
                  <span>
                    {" "}
                    {dateSelectedCheckOut?.toLocaleString("vi-vn", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm">
            <h4 className="font-bold text-lg mb-4">Phòng của bạn</h4>

            <div className="flex gap-4">
              <img
                src={
                  room.imageServiceItems?.[0]?.image?.url
                    ? `${BASE_IMAGE_URL}${room.imageServiceItems[0].image.url}`
                    : "https://via.placeholder.com/150"
                }
                alt={room.name}
                className="w-24 h-24 object-cover rounded-md bg-gray-100"
              />
              <div className="flex-1">
                <h5 className="font-semibold">{room.name}</h5>
                <div className="mt-2 space-y-1 text-sm">
                  {room.area && (
                    <p>
                      <i className="fa-solid fa-maximize mr-2"></i>
                      {room.area} m²
                    </p>
                  )}
                  <p>
                    <i className="fa-solid fa-user-group mr-2"></i>
                    Tối đa {room.max_people} người
                  </p>
                </div>
              </div>
            </div>

            {room.amenitiesServiceItems && (
              <div className="mt-2">
                <p className="font-semibold text-sm mb-2">Tiện ích</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {room.amenitiesServiceItems.map((amenity) => (
                    <div className="flex items-center gap-2">
                      <Check color="success" />
                      <span className="text-sm italic">
                        {amenity.amenityServiceItem.amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm">
            <h4 className="font-bold text-lg mb-4">Chi tiết giá</h4>
            <div className="space-y-3 text-base">
              <div className="flex justify-between">
                <span>
                  Giá phòng{" "}
                  <span className="italic text-sm">
                    ({roomQuantity} x {room.name})
                  </span>
                </span>
                <span className="font-medium">
                  {room.price ? roomQuantity * room.price + " VNĐ" : ""}
                </span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="font-medium">
                  {room.price ? roomQuantity * room.price + " VNĐ" : ""}
                </span>
              </div>
            </div>

            <Button
              disabled={!isFormValid}
              className={`mt-6 w-full py-3 rounded-md transition 
                ${
                  isFormValid
                    ? "bg-black text-white hover:bg-gray-900"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              onClick={submitPost}
            >
              Đặt ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBook;
