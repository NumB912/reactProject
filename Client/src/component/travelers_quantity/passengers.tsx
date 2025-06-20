import React from 'react';

interface Prop{
  setSelectedPassengers:(passengers:string)=>void;
  setIsSelectedPassenger:(isSelected:boolean)=>void;
}

const Passengers = ({setSelectedPassengers,setIsSelectedPassenger}:Prop) => {
  const passengerOptions: string[] = ["Select", "1", "2", "3", "4", "5", "6+"];

  return (
    <div className="passengers w-full">
      <div className="flex flex-col text-center rounded-2xl overflow-hidden shadow-md">
        {passengerOptions.map((label:string, index) => (
          <div
            key={index}
            className={`p-3 hover:bg-gray-200 cursor-pointer transition ${
              index === 0 ? 'bg-gray-100 font-semibold' : ''
            }`}

            onClick={()=>{setSelectedPassengers(label),
              setIsSelectedPassenger(false)

            }
            }
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passengers;
