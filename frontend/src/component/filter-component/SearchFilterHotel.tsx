import React, { useEffect, useState } from "react";
import { useCalendarHotel } from "../../store/CalendarStore/CalendarHotelStore";
import { formatDate } from "../../utils/TimeHandle";
import Calendar_Hotel from "../calendar/CalendarHotel";
import Traveler_Hotel from "../passenger-content/PassengersHotel";
import useTravelerHotel from "../../store/PassengerStore/CustomerHotelStore";
import PassengersHotel from "../passenger-content/PassengersHotel";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import { Button } from "../UI";
import SearchFilter from "./SearchFilter";
import InputLabelToggle from "../input-component/Input-label-button";
import { useProvinceSearch } from "../../hook/useSearchLocation";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useBookingHotelStore } from "../../store";
interface Props {
  className?: string;
  dateStart: Date;
  dateEnd: Date;
  handleSubmit: () => void;
}

const SearchFilterHotel = ({
  className = "",
  dateStart = new Date(),
  dateEnd = new Date(),
  handleSubmit,
}: Props) => {
  const {
    searchText,
    setSearchText,
    setShowSuggestions,
    showSuggestions,
    searchResult,
    handleSelectDestination,
  } = useProvinceSearch();

  const {setSearchText:SetSearchTextBook} = useBookingHotelStore()


  const {
    setDateSelectedBook,
    setDateSelectedCheckOut,
  } = useCalendarHotel();

  useEffect(() => {
    if (searchText?.trim()) {
      SetSearchTextBook(searchText.trim());
    }

    if (dateStart instanceof Date && !isNaN(dateStart.getTime())) {
      setDateSelectedBook(dateStart);
    }

    if (dateEnd instanceof Date && !isNaN(dateEnd.getTime())) {
      setDateSelectedCheckOut(dateEnd);
    }
    setShowSuggestions(false);
  }, [dateStart, dateEnd]);

  useEffect(()=>{
    SetSearchTextBook(searchText)
  },[searchText])
  console.log(searchText)
  return (
    <SearchFilter className={`max-lg:flex-wrap relative ${className}`}>
      <InputLabelToggle
        value={searchText}
        label="Location"
        placeholder="Find hotel...."
        handleOnChange={(value) => {
          setSearchText(value);
          setShowSuggestions(true);
        }}
      />

      {showSuggestions && searchText.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
          {searchResult.length > 0 ? (
            <ul className="py-2">
              {searchResult.map((dest) => (
                <li key={dest.code}>
                  <button
                    onClick={() => handleSelectDestination(dest)}
                    className="w-full px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {dest.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {dest?.province
                          ? dest.province.fullName
                          : dest.fullName}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-8 text-center text-gray-500">
              Không tìm thấy địa điểm nào
            </div>
          )}
        </div>
      )}
      <div className="w-full flex items-center justify-center gap-2 mt-2 max-lg:flex-wrap">
        <div className="flex w-full gap-2 max-sm:flex-wrap">
          <Calendar_Hotel CalendarHotelClass="max-sm:w-screen max-sm:-translate-x-1/2  max-sm:left-1/2 max-lg:w-full max-lg:left-0 max-md:flex-wrap min-lg:left-1/2 min-lg:-translate-x-1/2 " />

          <PassengersHotel />
        </div>
        <Button className="w-fit max-lg:w-full" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </SearchFilter>
  );
};

export default SearchFilterHotel;
