import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import "./styles/home.css";
import { SearchBar, StarRatingStatic } from "../component";
import Banner from "../component/UI/Banner";
import ReusableSlider from "../component/SliderComponent/SliderComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../API/api";
import { Hotel } from "../model/hotel/hotel";
import { ServiceItem } from "../model/service_item";
import { room } from "../model/hotel/room/room";
import { RenderTravelItem } from "../component/ServiceRenderComponent/TravelRender";
import useStateLogin from "../store/LoginStore/login_store";

const Home = () => {
  const [hotel, setHotel] = useState<Hotel[]>();
  const {role} = useStateLogin()
  
  console.log(role)
  useEffect(() => {
    api
      .get("/service?type_id=HOTEL_SERVICE")
      .then((res) => {
        setHotel(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);
  return (
    <div className="container flex flex-col items-center justify-center bg-white">
      <SearchBar />
      <Banner />

      <div className="w-full p-2">
        <div className="content-items w-full">
          <div className="w-full">
            <ReusableSlider
              title="Explore new places"
              subtitle="The best places to travel"
              containerClassName="w-full py-8"
              itemClassName="px-2"
              sliderSettings={{
                slidesToShow: 4,
                autoplaySpeed: 4000,
                dots: false,
                responsive: [
                  { breakpoint: 1400, settings: { slidesToShow: 4 } },
                  { breakpoint: 1200, settings: { slidesToShow: 3 } },
                  { breakpoint: 992, settings: { slidesToShow: 2 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 576, settings: { slidesToShow: 1 } },
                ],
              }}
            >
              {hotel?.map((item) => {
                return (<div className="px-2"><RenderTravelItem item={item} /></div>);
              })}
            </ReusableSlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
