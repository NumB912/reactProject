import React from "react";

const BillingAddressForm = () => {
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
        <label className="text-[14px] font-bold">Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div>
        <label className="text-[14px] font-bold">Address</label>
        <input
          type="text"
          placeholder="Street Address"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-[14px] font-bold">City</label>
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="flex-1">
          <label className="text-[14px] font-bold">State/Province</label>
          <input
            type="text"
            placeholder="State/Province"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <div>
        <label className="text-[14px] font-bold">Zip/Postal Code</label>
        <input
          type="text"
          placeholder="Zip/Postal Code"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    </div>
  );
};

export default BillingAddressForm;
