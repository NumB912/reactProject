import React, { useEffect, useState } from "react";
import SideContentComponent from "./SideContentComponent";
import SideComponent from "./SideComponent";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Rating,
  Checkbox,
} from "@mui/material";
import SliderDual from "../UI/Slider/SliderDual";
import { useBookingHotelStore } from "../../store";
import api from "../../../API/api";

export interface AmenityHotel {
  id: number;
  icon: string;
  amenity: string;
}

export interface HotelType {
  id: string;
  type: string;
}

const SideHotelComponent = () => {
  const {
    maxPrice,
    minPrice,
    rangeLeft,
    rangeRight,
    setDestination,
    setRangeLeft,
    setRangeRight,
    setRating,
    setMinPrice,
    setMaxPrice,
    selectedAmenities,
    toggleAmenity,
    toggleHotelTypes,
    selectHotelTypes,
    selectedRating,
    setSelectRating,
  } = useBookingHotelStore();

  const [amenitiesList, setAmenitiesList] = useState<AmenityHotel[]>([]);
  const [hotelType, setHotelType] = useState<HotelType[]>([]);
  useEffect(() => {
    Promise.all([
      api
        .get<{ amenity: AmenityHotel[] }>("/amenity-service")
        .then((res) => {
          setAmenitiesList(res.data.amenity);
        })
        .catch((err) => {
          console.error("Failed to load amenities:", err);
        }),
      api.get<{ hotelType: HotelType[] }>("/hotel-type").then((res) => {
        setHotelType(res.data.hotelType);
      }),
    ]);
  }, []);

  useEffect(() => {
    setMaxPrice(10_000_000);
    setMinPrice(0);
  }, [selectedAmenities, selectHotelTypes, selectedRating]);

  const handleAmenityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const checked = event.target.checked;

    toggleAmenity(Number(value));
  };

  const handlePropertyTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const checked = event.target.checked;

    toggleHotelTypes(value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectRating(Number(value));
  };

  return (
    <SideComponent>
      <SideContentComponent label="Price">
        <SliderDual
          leftValue={rangeLeft}
          rightValue={rangeRight}
          maxPrice={maxPrice}
          minPrice={minPrice}
          onChange={(left, right) => {
            setRangeLeft(left);
            setRangeRight(right);
          }}
        />
      </SideContentComponent>

      <SideContentComponent label="Amenities Hotel">
        <FormControl component="fieldset">
          <FormGroup>
            {amenitiesList.map((amenity) => (
              <FormControlLabel
                key={amenity.id}
                control={
                  <Checkbox
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={handleAmenityChange}
                    value={amenity.id}
                  />
                }
                label={amenity.amenity}
              />
            ))}
          </FormGroup>
        </FormControl>
      </SideContentComponent>

      <SideContentComponent label="Đánh giá">
        <FormControl>
          <RadioGroup value={selectedRating} onChange={handleRatingChange}>
            {[5, 4, 3, 2].map((rating) => (
              <FormControlLabel
                key={rating}
                value={rating.toString()}
                control={<Radio />}
                label={
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Rating value={rating} readOnly size="small" />
                  </div>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </SideContentComponent>

      <SideContentComponent label="Loại hình cư trú">
        <FormControl component="fieldset">
          <FormGroup>
            {hotelType.map((type) => (
              <FormControlLabel
                key={type.id}
                control={
                  <Checkbox
                    checked={selectHotelTypes.includes(type.id)}
                    onChange={handlePropertyTypeChange}
                    value={type.id}
                  />
                }
                label={type.type}
              />
            ))}
          </FormGroup>
        </FormControl>
      </SideContentComponent>
    </SideComponent>
  );
};

export default SideHotelComponent;
