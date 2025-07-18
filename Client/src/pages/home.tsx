import React, { useEffect, useState } from "react";
import { HeartFavorite } from "../component/UI";
import { Link, Outlet, useNavigate } from "react-router";
import "./styles/home.css";
import { SearchBar } from "../component";
import Banner from "../component/UI/Banner";
import RatingStars from "../component/UI/StarRatingRadioOption";
import ReusableSlider from "../component/SliderComponent/SliderComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ServiceTour,
  HotelServices,
  RentalService,
} from "../Services/getService";
interface TravelItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
  rating?: number; // Có thể có hoặc không
  reviews?: number; // Có thể có hoặc không
}

interface Banner {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

const Home = () => {  
  const [tour, SetTour] = useState([])
  const [hotelServices, setHotelServices] = useState([]);

  const carouselItems: TravelItem[] = [
    {
      id: 1,
      title: "Khám phá Vịnh Hạ Long",
      description: "Thắng cảnh thiên nhiên kỳ vĩ của Việt Nam.",
      image:
        "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/09/vinh-ha-long-3-1624.jpg",
      rating: 4.5,
      reviews: 250,
    },
    {
      id: 2,
      title: "Du lịch Sapa",
      description: "Đắm mình trong vẻ đẹp núi rừng Tây Bắc.",
      image:
        "https://viettrekking.vn/wp-content/uploads/2020/01/30097580257_5b7be918f6_c-1.jpg",
      rating: 4.7,
      reviews: 180,
    },
    {
      id: 3,
      title: "Phố cổ Hội An",
      description: "Nét kiến trúc cổ kính và lãng mạn.",
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/hoi-an-quang-nam-vntrip.jpg",
      rating: 4.9,
      reviews: 300,
    },
    {
      id: 4,
      title: "Cố đô Huế",
      description: "Khám phá vẻ đẹp cổ kính của kinh đô xưa.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Ngomon2.jpg/1200px-Ngomon2.jpg",
      rating: 4.6,
      reviews: 210,
    },
    {
      id: 5,
      title: "Đà Nẵng biển gọi",
      description: "Tận hưởng những bãi biển tuyệt đẹp và ẩm thực phong phú.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9faGqJ4UyJM1S_GxuF-Us2lznsk-Ql3KM0A&s",
      rating: 4.8,
      reviews: 280,
    },
    {
      id: 6,
      title: "Nha Trang nắng gió",
      description: "Thiên đường nghỉ dưỡng với biển xanh, cát trắng.",
      image:
        "https://cdn2.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg",
      rating: 4.4,
      reviews: 190,
    },
    {
      id: 7,
      title: "Phú Quốc ngọc trai",
      description: "Khám phá hòn đảo lớn nhất Việt Nam với vẻ đẹp hoang sơ.",
      image:
        "https://blog.premierresidencesphuquoc.com/wp-content/uploads/2025/03/du-lich-phu-quoc-thang-4-22.webp",
      rating: 4.7,
      reviews: 220,
    },
    {
      id: 8,
      title: "Miền Tây sông nước",
      description: "Trải nghiệm cuộc sống trên sông nước và chợ nổi.",
      image:
        "https://bvhttdl.mediacdn.vn/291773308735864832/2023/9/7/chonoi-1694076469156-16940764692721622183288.jpg",
      rating: 4.3,
      reviews: 150,
    },
  ];

  const renderTravelItem = (item:TravelItem) => (
    <div
      className={`flex flex-col w-full max-sm:min-w-55 max-lg:min-w-45 aspect-square rounded-2xl`}
    >
      <div className="image w-full h-full relative">
        <img
          src={
            item.image ||
            "https://imgcdn.tapchicongthuong.vn/tcct-media/21/11/3/du-lich-vung-dong-bang-song-cuu-long.jpg"
          }
          alt=""
          className="w-full h-full rounded-t-md object-cover"
        />

            <HeartFavorite />
      </div>
      <div className="detail bg-gray-50 px-3 py-5 rounded-b-md w-full">
        <p className="font-bold text-md overflow-hidden w-full">{item.title}</p>
        <div className="flex items-center *:mr-1 *:text-[16px]">
          <p className="avg">4.1</p>

          <RatingStars stars={4.1} />
          <p className="quantity">(101)</p>
        </div>
      </div>
    </div>
  );

  const renderItemBanner = (item: Banner) => (
    <div className="Banner flex max-lg:w-full flex-nowrap gap-3 *:rounded-md max-lg:overflow-x-auto overflow-hidden ">
      <Link to={item.link || "#"} className="w-full h-full">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h3 className="text-lg font-bold text-[]">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
        </div>
      </Link>
    </div>
  );

  const renderMightFavorite = (item: TravelItem) => (
    <div className="flex flex-col w-full max-sm:min-w-55 max-lg:min-w-45 aspect-square">
      <div className="image w-full h-full relative">
        <img
          src={
            item.image ||
            "https://cdn3.ivivu.com/2022/08/Capella-Hanoi-ivivu.jpg"
          }
          alt=""
          className="w-full h-full rounded-md object-cover"
        />
            <HeartFavorite />
      </div>
      <div className="detail">
        <p className="font-bold text-[25px]">{item.title}</p>
        <div className="flex items-center *:mr-1 *:text-[16px]">
          <p className="avg">4.1</p>
          <RatingStars stars={4.1} />
          <p className="quantity">(101)</p>
        </div>
      </div>
    </div>
  );


  useEffect(() => {
    const loadData = async () => {
      SetTour(await ServiceTour());
      setHotelServices(await HotelServices());
    };
    loadData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-9/10 max-md:w-full">
        <SearchBar />
        <Banner />
        {/* <div className="flex w-3/4 flex-col m-0">
          <div className=" m-0"></div>
          <ReusableSlider
            items={}
            renderItem={renderItemBanner}
            containerClassName="w-full mx-auto"
            itemWrapperClassName="px-2 py-3"
            sliderSettings={{
              slidesToShow: 3,
              autoplaySpeed: 4000,
              dots: true,
              responsive: [
                { breakpoint: 1400, settings: { slidesToShow: 2 } },
                { breakpoint: 1200, settings: { slidesToShow: 1 } },
                { breakpoint: 992, settings: { slidesToShow: 1 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } },
              ],
            }}
          />
        </div> */}

        <div className="w-full max-md:w-4/5">
          <ReusableSlider
            items={carouselItems}
            renderItem={renderTravelItem}
            title="Explore new places"
            subtitle="The best places to travel"
            containerClassName="w-full"
            itemWrapperClassName="px-2 py-3"
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
          />
        </div>

        {/* <div className="flex justify-center w-3/4 items-center flex-col my-10">
          <ReusableSlider
            items={hotelServices}
            renderItem={renderMightFavorite}
            title="Might be your favorite"
            subtitle="Những điểm đến được yêu thích"
            containerClassName="w-full mx-auto"
            itemWrapperClassName="px-2 py-3"
            sliderSettings={{
              slidesToShow: 4,
              autoplaySpeed: 4000,
              dots: false,
              responsive: [
                { breakpoint: 1400, settings: { slidesToShow: 3 } },
                { breakpoint: 1200, settings: { slidesToShow: 2 } },
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } },
              ],
            }}
          />
        </div> */}
      </div>

      <div className="w-full flex-col flex items-center justify-center font-bold p-20 ">
        <div className="flex items-center gap-3 *:text-7xl p-3">
          <p>Favorite places </p>
          <i className="fa-solid fa-heart text-red-500"></i>
          <span>Add to favorites</span>
        </div>
        <div className="flex items-center justify-center flex-col w-full">
          <div className="flex items-center *:text-2xl *:p-5 *:m-3">
            <div className="text-center p-3">
              <p>Miền Bắc</p>
            </div>

            <div className="text-center p-3">
              <p>Miền Trung</p>
            </div>

            <div className="text-center p-3">
              <p>Miền Đông Nam Bộ</p>
            </div>

            <div className="text-center p-3">
              <p>Miền Tây Nam Bộ</p>
            </div>
          </div>

          <div className="grid grid-cols-5 w-full grid-rows-3 *:w-full h-[800px] gap-3 *:overflow-hidden">
            <div className=" col-span-2 row-span-2 flex items-center justify-center relative hover:*:first:scale-110 *:transition rounded-2xl *:ease-in hover:*:last:*:last:w-full">
              <img
                src="https://phuquocxanh.com/vi/wp-content/uploads/2017/02/bien-dao-Phu-Quoc.jpg"
                className="w-full h-full object-cover "
              />
              <div className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                <p className="">Phú Quốc</p>
                <div className="line bg-white h-1 w-0 transition-all duration-300 origin-left"></div>
              </div>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl">
              <img
                src="https://bvhttdl.mediacdn.vn/291773308735864832/2025/2/21/2102dulichcantho-1740124732122-1740124732267497392733.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Cần Thơ
              </p>
            </div>
            <div className=" col-span-2 flex items-center justify-center relative *:rounded-2xl">
              <img
                src="https://phuquoctv.vn/assets/posts/1717511035-du-lich-bac-lieu6.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Bạc Liêu
              </p>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl">
              <img
                src="https://cdn3.ivivu.com/2022/06/C%C3%A0-Mau.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Cà Mau
              </p>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl">
              <img
                src="https://bcp.cdnchinhphu.vn/334894974524682240/2024/1/5/tien-giang-700-1704451520797464800646.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Tiền Giang
              </p>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl row-span-2">
              <img
                src="https://www.homecredit.vn/upload/07_du_lich_an_giang_chua_lanh_cung_khung_canh_tru_tinh_cua_canh_dong_ta_pa_f6b2ca2aca.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                An Giang
              </p>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl">
              <img
                src="https://vcdn1-dulich.vnecdn.net/2023/12/10/senT-jpeg-4319-1702147840.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=s7Ghwis70BJ0AqOBL4AipA"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Đồng Tháp
              </p>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl col-span-2">
              <img
                src="https://bcp.cdnchinhphu.vn/334894974524682240/2023/11/6/hvtkhuong325032023141502-16992446333311032475439.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Kiên Giang
              </p>
            </div>
            <div className="flex items-center justify-center relative *:rounded-2xl">
              <img
                src="https://ik.imagekit.io/tvlk/blog/2023/02/ben-tre-co-gi-choi-4.jpg"
                className="w-full h-full object-cover"
              />
              <p className="absolute left-1/2 top-1/2 -translate-1/2 z-10 text-2xl text-white font-bold">
                Bến Tre
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
