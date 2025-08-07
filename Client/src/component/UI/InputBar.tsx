import React, { useEffect, useRef, useState } from "react";
import { Image } from "../../interface/ImagePhotoUrl";

interface InputBarProps {
  placeholder?: string;
  foundServices?: Service[];
  recommendService?: Service[];
  onChange: (value: string) => void;
  classNameInput?:string;
  classNameIcon?:string;
  classNameContent?:string
}

export interface Service {
  id: string;
  img: Image;
  nameService: string;
}

const InputBar: React.FC<InputBarProps> = ({
  placeholder,
  onChange,
  foundServices,
  classNameContent=" top-15 rounded-2xl mt-3 p-3",
  classNameIcon="p-5 left-0",
  classNameInput="m-auto border bg-white border-gray-300 shadow-md rounded-full w-full p-4 max-sm:border-b max-sm:shadow-none max-sm:rounded-none max-sm:p-2 max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
}) => {
  const [isClose, setIsClose] = useState(false);
  const searchInput = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (searchInput && !searchInput.current?.contains(event.target as Node)) {
        setIsClose(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div className="relative w-full" ref={searchInput}>
      <div className=" w-full flex justify-center items-center">
        <i className={`fa-solid fa-magnifying-glass absolute ${classNameIcon}`}></i>
        <input
          type="text"
          placeholder={placeholder || "Search for a service..."}
          className={classNameInput}
          onFocus={() => {
            setIsClose(true);
          }}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
      </div>

      <div
        className={`bg-white absolute flex flex-col  w-full border-gray-300 border z-[4] -translate-x-1/2 left-1/2 ${classNameContent} ${
          isClose ? "" : "hidden"
        }`}
      >
        {foundServices ? (
          foundServices.map((service, index) => (
            <div key={service.id} className="hover:bg-gray-200 w-full  p-5 flex gap-3 items-center" onClick={()=>{setIsClose(false)}}>
              <div className="w-15">
                <img
                  src={
                    service.img.url ||
                    "https://media.travel.com.vn/Destination/dg_240925_Fantastic%20Skyline%20of%20Mostar.jpg"
                  }
                  className="w-full aspect-square object-cover"
                  alt={service.img.description}
                />
              </div>
              <p>{service.nameService}</p>
            </div>
          ))
        ) : (
          <div className="h-full w-full p-3 flex">
            <p>No result</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBar;
