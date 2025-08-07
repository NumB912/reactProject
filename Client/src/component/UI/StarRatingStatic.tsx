import React from "react";
import Star from "./Star";

interface StarRatingStaticProp {
  starNumber: number;
  styleStar?:string
}

const StarRatingStatic = ({ starNumber,styleStar='text-md' }: StarRatingStaticProp) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => 
        <Star isLight={index < starNumber} styleStar={styleStar}/>
      )}
    </div>
  );
};

export default StarRatingStatic;
