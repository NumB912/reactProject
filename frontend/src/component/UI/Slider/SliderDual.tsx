import React, { useState, useEffect } from "react";
import { Box, Slider } from "@mui/material";

interface SliderDualProps {
  minPrice: number;
  maxPrice: number;
  leftValue: number;
  rightValue: number;
  onChange: (min: number, max: number) => void; // trả dữ liệu ra
  onSubmit?: (min: number, max: number) => void;
}

const SliderDual: React.FC<SliderDualProps> = ({
  minPrice,
  maxPrice,
  leftValue,
  rightValue,
  onChange,
  onSubmit,
}) => {
  const [tempMin, setTempMin] = useState(leftValue);
  const [tempMax, setTempMax] = useState(rightValue);
  const formatNumber = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const unformatNumber = (value: string) =>
    Number(value.replace(/\./g, "") || 0);

  const calcStep = (min: number, max: number) => {
    const range = max - min;
    if (range <= 1_000_000) return 10_000;
    if (range <= 10_000_000) return 50_000;
    if (range <= 50_000_000) return 100_000;
    return 500_000;
  };

  const step = calcStep(minPrice, maxPrice);

  useEffect(() => {
    setTempMin(leftValue);
    setTempMax(rightValue);
  }, [leftValue, rightValue]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setTempMin(min);
    setTempMax(max);
    onChange(min, max); 
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) onSubmit(tempMin, tempMax);
  };

  const safeParseNumber = (text: string) => {
  if (!/^[\d.]*$/.test(text)) return false

  return true;
};

  const updateMin = (text: string) => {
    if(!safeParseNumber(text.split(".").join(""))){return}
    const value = unformatNumber(text);
    const newMin = Math.max(minPrice, Math.min(value, tempMax));
    setTempMin(newMin);
    onChange(newMin, tempMax);
  };

  const updateMax = (text: string) => {
    if(!safeParseNumber(text.split(".").join(""))){return}
    const value = unformatNumber(text);
    const newMax = Math.min(maxPrice, Math.max(value, tempMin));
    setTempMax(newMax);
    onChange(tempMin, newMax);
  };

  return (
    <div className="flex flex-col gap-5 py-5">
      <Box sx={{ width: "100%" }}>
        <Slider
          value={[tempMin, tempMax]}
          onChange={handleSliderChange}
          min={minPrice}
          max={maxPrice}
          step={step}
          valueLabelDisplay="auto"
          disableSwap
        />
      </Box>

      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-600">Min cost</label>
          <input
            type="text"
            value={formatNumber(tempMin)}
            onChange={(e) => updateMin(e.target.value)}
            onKeyDown={handleEnter}
            className="border border-gray-300 rounded px-3 py-2 w-28 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-600">Max cost</label>
          <input
            type="text"
            value={formatNumber(tempMax)}
            onChange={(e) => updateMax(e.target.value)}
            onKeyDown={handleEnter}
            className="border border-gray-300 rounded px-3 py-2 w-28 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderDual;
