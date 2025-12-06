import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../component/UI";
import FilterCheckInHotel from "../../../component/filter-component/SearchFilterHotel";
import Comment from "../../comment";
import CardContent from "../../../component/service's-body/CardContent";
import IconLabel from "../../../component/UI/IconLabel";
import RoomCard from "./RoomCard";
import InfoService from "../../../component/infoService";
import ImageSlide from "../../../component/ImageSlide";
import { useParams, useSearchParams } from "react-router";
import { Amenity } from "../../../model/facility";
import { Icon, Typography } from "@mui/material";
import Rooms from "./Rooms";
import { Hotel } from "../../../model/hotel/hotel";
import api from "../../../../API/api";
import { Check } from "@mui/icons-material";
import { useCalendarHotel, useTravelerHotel } from "../../../store";
import { CalendarHotel } from "../../../component";
import Calendar_Hotel from "../../../component/calendar/CalendarHotel";
import PassengersHotel from "../../../component/passenger-content/PassengersHotel";
import { room } from "../../../model/hotel/room/room";
const BASE_IMAGE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const HotelDetail = () => {
  const [hotel, setHotel] = useState<Hotel | null>();
  const [room,setRoom] = useState<room[]>()
  const { dateSelectedBook, dateSelectedCheckOut } = useCalendarHotel();
  const {adultQuantity,childrenQuantity,roomQuantity} = useTravelerHotel()
  const param = useParams();

  useEffect(() => {
    api
      .get("/service/detail", {
        params: {
          service_id: param.hotelID,
        },
      })
      .then((res) => {
        setHotel(res.data.data);
        setRoom(res.data.data.serviceItems)
      });
  }, [param]);

  const handleSubmitSearchRoom = ()=>{
    api.get("/service/service-item",{
      params:{
        service_id:param.hotelID,
        children:childrenQuantity,
        adult:adultQuantity,
        room:roomQuantity,
        startDate:dateSelectedBook,
        endDate:dateSelectedCheckOut,
      }
    }).then((res) => {

      console.log(res)
      setRoom(res.data.data)

    });
  };

  return (
    <div className="container p-5">
      <div className="contain justify-center flex flex-col items-center">
        <div className="info-content">
          <div className="info-contact">
            {hotel && <InfoService service={hotel} />}
            <div className="image-slide my-5">
              {hotel?.imageServices && (
                <ImageSlide postPhotos={hotel.imageServices} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-10 grid-rows-2">
            <div className="infodetail col-span-6 row-span-2 *:mb-3">
              <CardContent
                title="Giới thiệu cơ bản"
                variant="outline"
                className="p-4"
              >
                {hotel?.info}
              </CardContent>
              <CardContent title="Tiện ích" variant="outline" className="p-4">
                <div className="grid grid-cols-5 max-md:grid-cols-2 gap-3">
                  {hotel?.amenities_hotels.map((item) => {
                    return (
                      <div className="flex gap-3">
                        <Check color="success" />
                        <p>{item.amenity.amenity}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </div>
            <div className="locationAndReview col-span-4 row-span-2 *:mb-3 flex flex-col px-4">
              <div className="location w-full h-full p-4 rounded border border-gray-200 shadow">
                <CardContent
                  title="Thông tin liên hệ"
                  variant="outline"
                  className="p-4 h-full"
                >
                  <div className="space-y-4 text-sm md:text-base">
                    <div className="flex items-start gap-3">
                      <span className="font-medium min-w-24">Địa chỉ:</span>
                      <p className="flex-1">
                        123 Võ Nguyên Giáp, Phường Phước Mỹ, Quận Sơn Trà, TP.
                        Đà Nẵng
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-24">Điện thoại:</span>
                      <a
                        href="tel:02363888888"
                        className="text-blue-600 hover:underline"
                      >
                        0236 388 8888
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-24">Hotline:</span>
                      <a
                        href="tel:0905111888"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        0905 111 888
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-24">Email:</span>
                      <a
                        href="mailto:info@hotelmykhe.com"
                        className="text-blue-600 hover:underline"
                      >
                        info@hotelmykhe.com
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-24">Website:</span>
                      <a
                        href="https://www.hotelmykhe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        www.hotelmykhe.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="booking_choose w-full flex flex-col items-center gap-5 justify-center p-5 mt-10 border border-gray-300 rounded-full">
        <Typography variant="h4" fontWeight={"bold"}>Lựa chọn ngày mà người dùng muốn đặt</Typography>
        <div className="flex w-8/12 gap-10">
          <Calendar_Hotel />
          <PassengersHotel />
          <Button className="min-w-[200px]" onClick={handleSubmitSearchRoom}>Tìm kiếm</Button>
        </div>
      </div>
      <Rooms rooms={room} hotelId={hotel?.id} />

      {/* 
      {hotel?.service.reviewsAndPostPhotos && (
        <Comment reviewAndPost={hotel?.service.reviewsAndPostPhotos} />
      )} */}
    </div>
  );
};

export default HotelDetail;
