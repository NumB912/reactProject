import React, { useState } from "react";

interface SliderDualProp {
  maxValue?: number;
  minValue?: number;
  step?: number;
  onSubmit?: (min: number, max: number) => void;
}

const SliderDual = ({
  maxValue = 500,
  minValue = 0,
  step = 10,
  onSubmit,
}: SliderDualProp) => {
  const [min, setMin] = useState<number>(minValue);
  const [max, setMax] = useState<number>(maxValue);

  // temp lưu giá trị nhập tay, chỉ update khi Enter
  const [tempMin, setTempMin] = useState<number>(min);
  const [tempMax, setTempMax] = useState<number>(max);

  // --- HANDLE RANGE SLIDER ---
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value < max && value >= minValue) {
      setMin(value);
      setTempMin(value);
      onSubmit?.(value, max);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value > min && value <= maxValue) {
      setMax(value);
      setTempMax(value);
      onSubmit?.(min, value);
    }
  };

  // --- HANDLE INPUT (ENTER mới update) ---
  const updateMinOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = tempMin;
      if (!isNaN(value) && value <= max && value >= minValue) {
        setMin(value);
        onSubmit?.(value, max);
      } else {
        setTempMin(min); // reset lại nếu nhập sai
      }
    }
  };

  const updateMaxOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = tempMax;
      if (!isNaN(value) && value >= min && value <= maxValue) {
        setMax(value);
        onSubmit?.(min, value);
      } else {
        setTempMax(max); // reset lại nếu nhập sai
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 py-5">
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded"></div>

        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-black rounded"
          style={{
            left: `${(min / maxValue) * 100}%`,
            right: `${100 - (max / maxValue) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={min}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-3
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
            top-1/2 -translate-y-1/2"
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={max}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-3
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:pointer-events-auto
            top-1/2 -translate-y-1/2"
        />
      </div>

      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex flex-col">
          <label className="text-[10px]">Min cost</label>
          <input
            type="number"
            value={tempMin}
            onChange={(e) => setTempMin(Number(e.target.value))}
            onKeyDown={updateMinOnEnter}
            className="border border-gray-300 rounded px-2 w-20 
                     [appearance:textfield]
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none
                     text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px]">Max cost</label>
          <input
            type="number"
            value={tempMax}
            onChange={(e) => setTempMax(Number(e.target.value))}
            onKeyDown={updateMaxOnEnter}
            className="border border-gray-300 rounded px-2 w-20 
                     [appearance:textfield]
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none
                     text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderDual;
