import React from "react";
interface Prop{
  stars:number
  
}
const RatingStar = ({stars}:Prop) => {
  return (
    <div className="relative inline-block text-[16px] leading-none ">
      <div className="*:text-gray-400">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>

      <div
        className="rating bg-linear-to-r frsom-yellow-400 to-yellow-400 bg-clip-text *:text-transparent absolute top-0 left-0"
        style={{
          backgroundSize: `${(stars*100)/5}%`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
    </div>
  );
};

export default RatingStar;
