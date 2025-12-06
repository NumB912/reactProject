import React from "react";
import StarRatingStatic from "./UI/StarRatingStatic";
import { Link } from "react-router";
import Icon from "./UI/Icon";
import IconButton from "./UI/Button/IconButton";
import { Service } from "../model/Service";
import { Hotel } from "../model/hotel/hotel";
import { Rating } from "@mui/material";
import {Button} from "@mui/material";
import { FaHeart } from "react-icons/fa";

interface InfoContactServiceProp {
  service?: Hotel;
}

const InfoContactService = ({ service }: InfoContactServiceProp) => {
  return (
    service && (
      <div className="flex justify-between mt-20">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold">{service.service_name}</p>
          <div className="flex justify-start gap-2">
            <p className="score-star-rating">{service.rating}</p>
            <Rating value={service.rating}/>
            <p>({service.total_reviews} Đánh giá)</p>
          </div>

          <div className="location-service">
            <Icon name="location-dot" size={18} className="mr-2" />
            <span>{`${service.location.location}, ${service.location.ward.fullName}, ${service.location.ward.province.fullName}`}</span>
          </div>

          <div className="flex gap-3">
            <button className="flex items-centerhover:*:underline cursor-pointer">
              <Icon name="phone" size={18} className="mr-2" />
                      Viết đánh giá
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex gap-2 items-center justify-end">
            <IconButton
              icon="copy"
              variant="custom"
              typeButton="text"
              className="cursor-copy"
              iconSize={18}
              onClick={() => {}}
            />
           <Button variant="outlined" sx={{
            borderColor:"gray",borderRadius:"30px",color:"black"
           }}  startIcon={<FaHeart/>}>
           yêu thích
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <p className="price text-3xl font-bold">{service.price_from} VNĐ</p>
            <Button variant="contained" sx={{
              backgroundColor:"black",
              color:"white",
              borderRadius:"20px"
            }}>
              Xem thêm giá
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default InfoContactService;
