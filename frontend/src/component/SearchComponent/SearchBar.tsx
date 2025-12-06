import React, { useState } from "react";
import { useNavigate, useNavigation } from "react-router";

import SearchRental from "./searchRentalCar";
import SearchFlight from "./SearchFlight";
import searchHotel from "./searchHotel";
import SearchHotel from "./searchHotel";
import SearchTour from "./searchTour";
import SearchAll from "./searchAll";
import { Button } from "../UI";
import IconAndLabel from "../UI/IconLabel";
const SearchBar = () => {
  const [Type, setType] = useState("SearchALL");

  return (
    <>
      <div className="flex w-full flex-col justify-center items-center my-3 bg-white">
        <h1 className="text-[3vw] font-bold text-center m-4 max-sm:hidden">
          {Type === "SearchALL" && <p>TÌm kiếm dịch vụ mà bạn muốn...</p>}
          {Type === "Hotels" && (
            <p>Hãy chọn một khách sạn cho chuyến đi của bạn.</p>
          )}
          {Type === "Tour" && <p>Khám phá các gói tour và trải nghiệm.</p>}
          {Type === "Flights" && (
            <p>Tìm kiếm những ưu đãi chuyến bay tốt nhất.</p>
          )}
          {Type === "RentalCar" && <p>Đặt xe cho thuê dễ dàng.</p>}
        </h1>
        <div
          className="w-full flex justify-center items-center mx-4 p-2 my-2 h-full *:hover:bg-gray-200 overflow-hidden max-md:overflow-x-scroll max-md:justify-start max-lg:w-4/5
        *:p-1.5 *:rounded-4xl *:max-sm:text-sm *:min-w-30 *:flex *:flex-nowrap *:justify-center *:items-center max-md:max-w-2xl *:shrink-0 *:m-1 *:max-lg:w-25"
        >
          {/* <Button
            onClick={() => setType("SearchALL")}
            variant="outline"
            rounded="full"
            className={`item w-30 p-2 cursor-pointer border-2 font-semibold hover:bg-primary transition duration-150 ${
              Type === "SearchALL" ? "border-primary" : "border-transparent"
            }`}
          >
            <IconAndLabel Label="Tất cả" name="border-all" />
          </Button> */}
          <Button
            onClick={() => setType("Hotels")}
            variant="outline"
            rounded="full"
            className={`item w-30 p-2 cursor-pointer border-2 font-semibold hover:bg-primary transition duration-150 ${
              Type === "Hotels" ? "border-primary" : "border-transparent"
            }`}
          >
            <IconAndLabel Label="Khách sạn" name="bed" />
          </Button>

          <Button
            onClick={() => setType("Tour")}
            variant="outline"
            rounded="full"
            className={`item w-30 p-2 cursor-pointer border-2 font-semibold hover:bg-primary transition duration-150 ${
              Type === "Tour" ? "border-primary" : "border-transparent"
            }`}
          >
            <IconAndLabel Label="Tour" name="location-dot" />
          </Button>

          {/* <Button
            onClick={() => setType("Flights")}
            variant="outline"
            rounded="full"
            className={`item w-30 p-2 cursor-pointer border-2 font-semibold hover:bg-primary transition duration-150 ${
              Type === "Flights" ? "border-primary" : "border-transparent"
            }`}
          >
            <IconAndLabel Label="Vé máy bay" name="plane" />
          </Button> */}

          <Button
            onClick={() => setType("RentalCar")}
            variant="outline"
            rounded="full"
            className={`item w-30 p-2 cursor-pointer border-2 font-semibold hover:bg-primary transition duration-150 ${
              Type === "RentalCar" ? "border-primary" : "border-transparent"
            }`}
          >
            <IconAndLabel Label="Thuê xe" name="car" />
          </Button>
        </div>

        <div className="w-full flex justify-center px-5">
          {Type == "Flights" ? (
            <SearchFlight />
          ) : Type == "RentalCar" ? (
            <SearchRental />
          ) : Type == "Tour" ? (
            <SearchTour />
          ) : Type == "Hotels" ? (
            <SearchHotel />
          ) : (
            <SearchAll />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
