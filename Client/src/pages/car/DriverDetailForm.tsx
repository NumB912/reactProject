import React from "react";

const DriverDetailForm = () => {
  return (
    <div className="flex flex-col justify-center w-full max-w-md gap-3 *:flex *:flex-col *:gap-1">
      <div>
        <label className="text-[14px] font-bold">Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <label className="text-[14px] font-bold">Email Address</label>
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <label className="text-[14px] font-bold">Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    </div>
  );
};

export default DriverDetailForm;
