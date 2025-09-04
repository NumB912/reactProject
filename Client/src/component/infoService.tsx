import React from "react";
import StarRatingStatic from "./UI/StarRatingStatic";
import { Link } from "react-router";
import { Button, ButtonIcon } from "./UI";
import Icon from "./UI/Icon";
import IconButton from "./UI/Button/IconButton";
import { Service } from "../model/Service";

interface InfoContactServiceProp {
  service?: Service;
}

const InfoContactService = ({ service }: InfoContactServiceProp) => {

  console.log(service)
  return (
    service && (
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold">{service.name}</p>
          <div className="flex justify-start gap-2">
            <p className="score-star-rating">{service.ratingAvg}</p>
            <StarRatingStatic starNumber={service.ratingAvg} />
            <p>({service.reviewQuantity} Reviews)</p>
          </div>

          <div className="location-service">
            <Icon name="location-dot" size={18} className="mr-2" />
            <span>{service.address}</span>
          </div>

          <div className="flex gap-3">
            <button className="flex items-centerhover:*:underline cursor-pointer">
              <Icon name="phone" size={18} className="mr-2" />
              <span className="">{service.contact.phone}</span>
            </button>
            {service.contact.email&&<button className="flex items-centerhover:*:underline cursor-pointer">
              <Icon name="mail-reply" size={18} className="mr-2" />
              <span className="">{service.contact.email}</span>
            </button>}
            <button className="flex items-center hover:*:underline cursor-pointer">
              <Icon name="pen" size={18} className="mr-2" />
              <span className=""> Write review</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex gap-2 justify-start items-center">
            <IconButton
              icon="copy"
              variant="custom"
              typeButton="text"
              className="cursor-copy"
              iconSize={18}
              onClick={() => {}}
            />
            <IconButton
              variant="outline"
              typeButton="text"
              icon="heart"
              iconColorActive="text-red-500"
              className="p-2 w-full"
              iconSize={18}
            >
              Save
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <p className="price text-3xl font-bold">$ 355</p>
            <Button typeButton="text" variant="outline" onClick={() => {}}>
              View Deal
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default InfoContactService;
