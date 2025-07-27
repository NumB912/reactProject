import React, { useEffect, useState } from "react";
import { Button, InputBar } from "../UI";
import { useChooseCalendar } from "../../store/CalendarStore/calendar_store";
import { data } from "react-router";
import { useTravelerFlight } from "../../store";
import { TagTicker } from "../SelectComponent/PassengersFlight";
import { Input } from "@mui/material";
import DropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import CalendarFlight from "../calendar/CalendarFlight";
function SearchFlight() {
  const { dateSelectedBook, dateSelectedReturn } = useChooseCalendar();

  const { total } = useTravelerFlight();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTraveler, setTraveler] = useState(false);

  function handleDate(date?: Date) {
    if (!date) return "";

    return `${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getDate()}`;
  }

  return (
    <div className="flex justify-center items-center gap-2 p-3 max-xl:flex-wrap">
      <div className="flex gap-2 w-full max-sm:flex-wrap">
        <InputBar onChange={()=>{}}/>
        <InputBar onChange={()=>{}}/>
      </div>

      <div
        className="gap-2 relative flex items-center max-sm:flex-wrap max-lg:justify-center
            *:flex *:items-center *:p-4 *:pr-8 *:rounded-md *:gap-3 *:border w-full *:w-full"
      >
        <DropDownOutLineItem handleOnClick={() => {}}>
          <div
            className="CheckInBlock relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowCalendar(!showCalendar);
              setTraveler(false);
            }}
          >
            <i className="fa-solid fa-calendar"></i>
            <p className="text-[14px] font-semibold">
              {handleDate(dateSelectedBook) +
                "-" +
                handleDate(dateSelectedReturn)}
            </p>

            <div
              className={`bg-white absolute w-[700px] top-[326px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl
      max-lg:left-full max-2xl:left-0 ${!showCalendar ? "hidden" : "block"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <CalendarFlight />
            </div>
          </div>
        </DropDownOutLineItem>

        <DropDownOutLineItem handleOnClick={() => {}}>
          <div
            className="roomAndGuest relative"
            onClick={(e) => {
              e.stopPropagation();
              setTraveler(!showTraveler);
              setShowCalendar(false);
            }}
          >
            <i className="fa-solid fa-users"></i>
            <p className="text-[14px] font-semibold">
              {total > 1 ? `${total} travelers` : `${total} traveler`}{" "}
            </p>

            <div
              className={`bg-white absolute w-[500px] top-[207px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${!showTraveler ? "hidden" : "block"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <TagTicker
                onClose={() => {
                  setTraveler(!showTraveler);
                }}
              />
            </div>
          </div>
        </DropDownOutLineItem>
      </div>

      <Button
        className="p-4 max-xl:w-full"
        onClick={() => {
          console.log("press");
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchFlight;
