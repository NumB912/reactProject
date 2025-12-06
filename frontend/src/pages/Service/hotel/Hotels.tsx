import React, { useEffect, useState } from "react";
import {
  useBookingHotelStore,
  useCalendarHotel,
  useTravelerHotel,
} from "../../../store";
import FilterCheckInHotel from "../../../component/filter-component/SearchFilterHotel";
import DualSlider from "../../../component/SliderRangeComponent/DualSlider";
import { Button, Modal } from "../../../component/UI";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { StarRatingStatic } from "../../../component";
import DropDownSelect from "../../../component/dropdown-component/DropDownSelect";
import WrapDropDownOutLineItem from "../../../component/dropdown-component/WrapDropDownOutLineItem";
import DropDownContent from "../../../component/dropdown-component/DropDownContent";
import SortHotel from "../../../component/SortComponent/SortHotel";
import Star from "../../../component/UI/Star";
import SideHotelComponent from "../../../component/SideComponent/SideHotelComponent";
import SideHotelModalComponent from "../../../component/SideComponent/SideModalComponent/SideHotelModalComponent";
import SortModalComponent from "../../../component/SortComponent/SortModalComponent/SortModalComponent";
import IconButton from "../../../component/UI/Button/IconButton";
import { useProvinceSearch } from "../../../hook/useSearchLocation";
import PassengersHotel from "../../../component/passenger-content/PassengersHotel";
import api from "../../../../API/api";
import { Search } from "@mui/icons-material";
import HotelCard from "./HotelCard";
import { Hotel } from "../../../model/hotel/hotel";


const Hotels = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParam] = useSearchParams();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [hotels, setHotels] = useState<Hotel[]>();
  const {
    adultQuantity,
    roomQuantity,
    childrenQuantity,
    setAdultQuantity,
    setChildrenQuantity,
    setRoomQuantity,
  } = useTravelerHotel();

  const { setDateSelectedBook, setDateSelectedCheckOut,dateSelectedBook,dateSelectedCheckOut } = useCalendarHotel();

  const {
    destination,
    rangeLeft,
    rangeRight,
    selectedAmenities,
    selectedRating,
    style,
    setLocation,
    selectHotelTypes,
    location,
    setSelectRating,
    setRangeLeft,
    setRangeRight,
    setSearchText,
    searchText,
  } = useBookingHotelStore();

  const { setSearchText: setProvinceSearch } = useProvinceSearch();
  const params = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const { search = "" } = params;
    setSearchText(search);
    setProvinceSearch(search);
  }, []);

  useEffect(() => {
    api
      .get("/service", {
        params: {
          search: searchText,
          type_id: "HOTEL_SERVICE",
          startDate:dateSelectedBook,
          endDate:dateSelectedCheckOut,
          children:childrenQuantity,
          adult:adultQuantity,
          room:roomQuantity
        },
      })
      .then((res) => {
        setHotels(res.data.data);
      });
  }, [searchParams]);


  const handleSubmit = async () => {
    console.log(dateSelectedCheckOut)
    await api
      .get("/service", {
        params: {
          search: searchText,
          type_id: "HOTEL_SERVICE",
          amenities_hotel: selectedAmenities.join(","),
          type_hotel: selectHotelTypes.join(","),
          rating: selectedRating,
          startDate: dateSelectedBook,
          endDate: dateSelectedCheckOut,
          children:childrenQuantity,
          room:roomQuantity,
          adult:adultQuantity
        },
      })
      .then((res) => {
        setHotels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
    navigate(`/hotels?search=${searchText}`);
  };

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-[250px_1fr] justify-center gap-5 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Nơi mà bạn muốn đến, Hãy nói với chúng tôi
        </p>
      </div>
      <div className="col-span-2">
        <FilterCheckInHotel
          dateEnd={endDate}
          dateStart={startDate}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="side-hotel">
        <SideHotelComponent />
      </div>
      <div className="w-full gap-1 flex flex-col max-lg:col-span-2">
        {hotels?.map((hotel) => (
          <HotelCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
