import React from "react";
import Star from "./Star";

interface StarRatingStaticProp {
  starNumber: number;
}

const StarRatingStatic = ({ starNumber }: StarRatingStaticProp) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => 
        <Star isLight={index < starNumber} styleStar='text-md'/>
      )}
    </div>
  );
};

export default StarRatingStatic;
