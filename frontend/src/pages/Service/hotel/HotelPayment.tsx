import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Button } from "../../../component/UI";
import api from "../../../../API/api";
const HotelPayment = () => {

  const {id} = useParams()

  console.log(id)

  useEffect(()=>{
    api.get("/api/payment",{
      params:{
        id:id
      }
    }).then((res)=>console.log(res))
  })

  return (
    <div className="w-7xl max-w-full py-8 container">
      <div className="w-full flex items-center justify-center p-3 flex-wrap">
        <div className="flex w-full flex-row justify-between items-center relative mb-5">
          <div className="absolute w-full h-1 top-6 bg-gray-200 z-0"></div>
          <div className="absolute w-full h-1 top-6 bg-blue-200 z-0"></div>

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
      <div className="grid grid-cols-[1fr_600px] grid-rows-1 border-t border-gray-300 py-5 w-full">
        <div className="flex flex-col gap-3">
          <div className=" infoDriverDetailForm flex flex-col gap-3 border border-gray-300 rounded-md p-3">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col justify-center ">
                <p className="text-2xl font-bold">Chọn phương thức thanh toán</p>
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
                  <p className="text-md">Thanh toán với VNpay</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-6">
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
                    ? `${BASE_IMAGE_URL}/${room.imageServiceItems[0].image.url}`
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

            {room.amenitiesRooms && (
              <div className="mt-2">
                <p className="font-semibold text-sm mb-2">Tiện ích</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {room.amenitiesRooms.map((amenity) => (
                    <div className="flex items-center gap-2">
                      <Check color="success" />
                      <span className="text-sm italic">
                        {amenity.amenityServiceItems.amenity}
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
        </div> */}
      </div>
    </div>
  );
};

export default HotelPayment;
