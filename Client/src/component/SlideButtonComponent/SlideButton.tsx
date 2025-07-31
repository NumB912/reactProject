// ToggleSwitch.jsx
import React from "react";
import { useState } from "react";

interface ToggleSwitchProp{
    options:string[],
    onChange:(value:string)=>void;
}

export default function ToggleSwitch({ options = [], onChange }:ToggleSwitchProp) {
  const [active, setActive] = useState(options[0]);

  const handleClick = (opt:string) => {
    setActive(opt);
    onChange?.(opt);
  };

  return (
    <div className="relative bg-gray-100 w-fit h-fit flex rounded-full p-2">
      <div
        className="absolute top-1 bottom-1 w-[80px] rounded-full bg-white shadow-md transition-transform duration-300"
        style={{
          transform: `translateX(${options.indexOf(active) * 100}%)`,
        }}
      />
      {options.map((opt) => (
        <div
          key={opt}
          onClick={() => handleClick(opt)}
          className="relative w-[80px] text-center cursor-pointer"
        >
          <p className={active === opt ? "font-semibold" : "text-gray-500"}>
            {opt}
          </p>
        </div>
      ))}
    </div>
  );
}
