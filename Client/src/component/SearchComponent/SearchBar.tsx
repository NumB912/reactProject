import React, { useState } from "react";
import { useNavigate, useNavigation } from "react-router";

import SearchRental from "./searchRentalCar";
import SearchAll from "./searchOnly";
import SearchFlight from "./SearchFlight";
import searchHotel from "./searchHotel";
import SearchHotel from "./searchHotel";
import SearchTour from "./searchTour";
 const SearchBar = () => {
  const [Type, setType] = useState("SearchALL");

  return (
    <>
      <div className="flex w-full flex-col justify-center items-center my-3 bg-white">
        <h1 className="text-[3vw] font-bold text-center m-4 max-sm:hidden">
          {Type === "SearchALL" && <p>Showing all results...</p>}
          {Type === "Hotels" && <p>Find the best hotels for your trip.</p>}
          {Type === "Tour" && <p>Explore tour packages and experiences.</p>}
          {Type === "Flights" && <p>Search for the best flight deals.</p>}
          {Type === "RentalCar" && <p>Book rental cars easily.</p>}
        </h1>
        <div
          className="w-full flex justify-center items-center mx-4 p-2 my-2 h-full *:hover:bg-gray-200 overflow-hidden max-md:overflow-x-scroll max-md:justify-start max-lg:w-4/5
        *:p-1.5 *:rounded-4xl *:max-sm:text-sm *:min-w-30 *:flex *:flex-nowrap *:justify-center *:items-center max-md:max-w-2xl *:shrink-0 *:m-1 *:max-lg:w-25"
        >
          <div
            onClick={() => setType("SearchALL")}
            className={`item w-30 p-2 rounded cursor-pointer border-2 font-semibold hover:bg-gray-100 transition duration-150 ${
              Type === "SearchALL" ? "border-black" : "border-transparent"
            }`}
          >
            <i className="fa-solid fa-border-all mr-2"></i> Search all
          </div>

          <div
            onClick={() => setType("Hotels")}
            className={`item w-30 p-2 rounded cursor-pointer border-2 font-semibold hover:bg-gray-100 transition duration-150 ${
              Type === "Hotels" ? "border-black" : "border-transparent"
            }`}
          >
            <i className="fa-solid fa-hotel mr-2"></i> Hotels
          </div>

          <div
            onClick={() => setType("Tour")}
            className={`item w-30 p-2 rounded cursor-pointer border-2 font-semibold hover:bg-gray-100 transition duration-150 ${
              Type === "Tour" ? "border-black" : "border-transparent"
            }`}
          >
            <i className="fa-solid fa-location-dot mr-2"></i> Tour
          </div>

          <div
            onClick={() => setType("Flights")}
            className={`item w-30 p-2 rounded cursor-pointer border-2 font-semibold hover:bg-gray-100 transition duration-150 ${
              Type === "Flights" ? "border-black" : "border-transparent"
            }`}
          >
            <i className="fa-solid fa-plane mr-2"></i> Flights
          </div>

          <div
            onClick={() => setType("RentalCar")}
            className={`item w-30 p-2 rounded cursor-pointer border-2 font-semibold hover:bg-gray-100 transition duration-150 ${
              Type === "RentalCar" ? "border-black" : "border-transparent"
            }`}
          >
            <i className="fa-solid fa-car mr-2"></i> Rental car
          </div>
        </div>

      <div className="w-full flex justify-center px-5">
              {Type == "Flights" ? (
                <SearchFlight />
              ) : Type == "RentalCar" ? (
                <SearchRental />
              ) : Type == "Tour"?(
                <SearchTour/>
              ):Type=="Hotels"?(<SearchHotel/>):(<></>)}
      </div>
      </div>
    </>
  );
};

export default SearchBar