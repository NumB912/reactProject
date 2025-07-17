import React, { useState } from "react";

interface InputBarProps {
  placeholder?: string;
  foundServices?: string[];
  onSearch?: (value: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({
  placeholder,
  onSearch,
  foundServices,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="relative w-full flex justify-center items-center">
      <i className="fa-solid fa-magnifying-glass absolute left-6"></i>
      <input
        type="text"
        placeholder={placeholder || "Search for a service..."}
        className="m-auto border bg-white border-gray-300 shadow-md rounded-full w-full p-4
              max-sm:border-b max-sm:shadow-none max-sm:rounded-none max-sm:p-2
              max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
        onFocus={() => {
          setFocus(true);
        }}
        onChange={(e) => {
          if (onSearch) {
            onSearch(e.target.value);
          }
        }}
      />

      <div
        className={`left-1/2 border border-gray-300 z-40 rounded-2xl top-17 -translate-x-1/2  w-full p-3 bg-white absolute flex flex-col ${
          focus ? "" : "hidden"
        }`}
      >
        {foundServices?.map((service, index) => (
          <div
            key={index}
            className="hover:bg-gray-200 w-full p-5 flex"
            onClick={() => {
              setFocus(false);
            }}
          >
            <p>{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputBar;
