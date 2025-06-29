import React from 'react';
import { usePassengerCar } from '../../store/PassengerStore/traveler_store_car';

const Passengers = () => {
  const { setNumberPassenger, setNumberPassengerOptions,numberPassenger,numberPassengerOptions } = usePassengerCar();

  return (
    <div className="passengers w-full">
      <div className="flex flex-col text-center rounded-2xl overflow-hidden shadow-md">
        {numberPassengerOptions.map((label:string, index) => (
          <div
            key={index}
            className={`p-3 hover:bg-gray-200 cursor-pointer transition ${
              index === 0 ? 'bg-gray-100 font-semibold' : ''
            }`}

            onClick={()=>{setNumberPassenger(label)}}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Passengers;
