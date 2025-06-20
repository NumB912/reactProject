import React, { useEffect, useState } from "react";
import Button from "../Button";
import Calendar from "../calendar/calendar";
import { useChooseCalendar } from "../../store/calendar_store";
import { data } from "react-router";
import TagTicker from "../travelers_quantity/TagTicker";
import { useTraveler } from "../../store/traveler_store_Flight";

function SearchFlight() {
  const {
    dateSelectedBook,
    dateSelectedReturn,
    setDateSelectedBook,
    setDateSelectedReturn,
    today,
  } = useChooseCalendar();

  const {total} = useTraveler();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTraveler, setTraveler] = useState(false);

  function handleDate(date?: Date) {
    if (!date)
      return "";

    return `${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getDate()}`;
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap w-8/10">
      <div className="flex gap-2 max-lg:w-3/4 flex-wrap">
        <div className="relative w-[230px] max-lg:w-full h-full flex justify-center items-center">
          <i className="fa-solid fa-plane-departure absolute left-6"></i>
          <input
            type="text"
            placeholder="Enter departure location"
            className="m-auto border border-gray-300 shadow-md rounded-md w-full p-4
                  max-sm:border-b 
                  max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
          />
        </div>

        <div className="relative w-[230px] max-lg:w-full h-full flex justify-center items-center">
          <i className="fa-solid fa-plane-arrival absolute left-6"></i>
          <input
            type="text"
            placeholder={"Asldknasldnk"}
            className="m-auto border border-gray-300 shadow-md rounded-md w-full p-4
                  max-sm:border-b
                  max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
          />
        </div>
      </div>

      <div
        className="gap-2 relative flex items-center max-sm:flex-wrap max-lg:justify-center
            *:flex *:items-center *:p-4 *:pr-8 *:rounded-md *:max-lg:w-full *:gap-3 *:border max-lg:w-3/4 "
      >
        <div
          className="CheckInBlock relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(!showCalendar);
            setTraveler(false)
          }}
        >
          <i className="fa-solid fa-calendar"></i>
          <p className="text-[14px] font-semibold">
            {handleDate(dateSelectedBook) +
              "-" +
              handleDate(dateSelectedReturn)}
          </p>

          <div
            className={`bg-white absolute w-[700px] top-[326px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${!showCalendar ? "hidden" : "block"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar />
          </div>
        </div>
        <div
          className="roomAndGuest relative"
          onClick={(e) => {
            e.stopPropagation();
            setTraveler(!showTraveler);
            setShowCalendar(false)
          }}
        >
          <i className="fa-solid fa-users"></i>
          <p className="text-[14px] font-semibold">{total>1?`${total} travelers`:`${total} traveler`} </p>

          <div
            className={`bg-white absolute w-[500px] top-[207px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${!showTraveler ? "hidden" : "block"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <TagTicker onClose={()=>{setTraveler(!showTraveler)}}/>
          </div>
        </div>
      </div>

      <Button
        className="p-4 w-[100px] max-xl:w-11/12 max-lg:w-3/4"
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
