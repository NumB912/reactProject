import React from "react";
import Star from "./Star";

interface StarRatingStaticProp {
  starNumber?: number;
  styleStar?:string
  contentClassName?:string;

}

const StarRatingStatic = ({ starNumber=0,styleStar='text-md',contentClassName="gap-1"}: StarRatingStaticProp) => {
  return (
    <div className={`flex ${contentClassName}`}>
      {Array.from({ length: 5 }).map((_, index) => 
        <Star isLight={index < starNumber} styleStar={styleStar}/>
      )}
    </div>
  );
};

export default StarRatingStatic; 
