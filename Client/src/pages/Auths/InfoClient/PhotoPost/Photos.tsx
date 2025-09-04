import React, { useState } from "react";
import CardComponent from "../CardComponent";
import { Link, useParams } from "react-router";
import ListItem from "../../../../component/UI/ListItem";
import Dropdown from "../../../../component/dropdown-component/Dropdown";
import DropDownContent from "../../../../component/dropdown-component/DropDownContent";
import { ButtonBorder } from "../../../../component/UI";
import { ClassNames } from "@emotion/react";
import { StarRatingStatic } from "../../../../component";
import Photo from "./Photo";

const Photos = () => {
  const { id } = useParams();

  return (
    <>
      {/* <CardComponent
  titleContent="Add your photos"
  content="Share your experience with this destination. Your opinion helps others!"
  urlContentLink="/PostPhotos"
  contentLink="Add photo"
/> */}
      <div className="photos grid grid-cols-3 gap-3 mt-2">
        <p className="col-span-3 font-bold w-full border-b border-gray-200">
          Last week
        </p>
        <Photo />
      </div>

      <div className="photos grid grid-cols-3 gap-3 mt-2">
        <p className="col-span-3 font-bold border-b border-gray-200">A month ago</p>
        <Photo />
        <Photo />
      </div>

      <div className="photos grid grid-cols-3 gap-3 mt-2">
        <p className="col-span-3 font-bold border-b border-gray-200">Years ago</p>
        <Photo />
      </div>
    </>
  );
};

export default Photos;
