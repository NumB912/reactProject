import React from "react";

const generateTimeSlots = (): string[] => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const suffix = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    times.push(`${displayHour}:00 ${suffix}`);
  }
  return times;
};

interface Prop {
  timeSelected: string;
  isTimeSelected:boolean;
  setTime: (timeSelected: string) => void;
  setIsTimeSelected: (isSelected: boolean) => void;
}

export const TimeSelected = ({ setIsTimeSelected, timeSelected, setTime}: Prop) => {
  const timeSlots = generateTimeSlots();
  return (
    <div className="w-full">
      <div className="flex flex-col h-[400px] w-full overflow-y-scroll *:py-3 *:hover:bg-gray-200 *:text-sm">
        {timeSlots.map((time, index) => (
          <div
            key={index}
            className="time-option cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setTime(time);
              setIsTimeSelected(false);
              console.log(time)
            }}
          >
            <div className="relative">
              {timeSelected === time && (
                <i className="fa-solid fa-check absolute left-1 top-1/2 -translate-y-1/2 text-green-600"></i>
              )}
              <div className="pl-5">{time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
