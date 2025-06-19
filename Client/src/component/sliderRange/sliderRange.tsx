import React, { useState } from "react";
import "./DualSlider.css";
import { useHotelFilter } from "../../store/filter_store";

const DualSlider = () => {
  const {
    maxPrice,
    minPrice,
    rangeLeft,
    rangeRight,
    setRangeLeft,
    setRangeRight,
  } = useHotelFilter();
  const handleMinChange = (e) => {
    const value = Math.min(e.target.value, rangeRight - 10); // Không để vượt rangeRight
    setRangeLeft(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(e.target.value, rangeLeft + 10); // Không để nhỏ hơn rangeLeft
    setRangeRight(value);
  };

  return (
    <div className="slider-container relative w-full max-w-md mx-auto mt-10">
      {/* 2 input range */}
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={rangeLeft}
        onChange={handleMinChange}
        className="thumb absolute z-30"
      />
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={rangeRight}
        onChange={handleMaxChange}
        className="thumb absolute z-20"
      />

      {/* Track */}
      <div className="slider-track relative h-[6px] mt-6 bg-gray-300 rounded-none">
        <div
          className="slider-range absolute top-0 h-[6px] bg-black rounded-none"
          style={{
            left: `${((rangeLeft - minPrice) / (maxPrice - minPrice)) * 100}%`,
            width: `${
              ((rangeRight - rangeLeft) / (maxPrice - minPrice)) * 100
            }%`,
          }}
        />
      </div>

      {/* Giá trị */}
      <div className="pt-5 text-[10px]">
        Giá trị: {rangeLeft} - {rangeRight}
      </div>
    </div>
  );
};

export default DualSlider;
