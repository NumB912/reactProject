import React, { useState } from "react";

interface InputShowProp {
  setValue: (value: string) => void;
  value: string;
}

const InputShow = ({ setValue, value }: InputShowProp) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="input-show relative">
      <input
        className="border border-gray-300 p-1.5 w-full text-sm"
        type={show?"text":"password"}
        placeholder="Password"
        onChange={(e)=>{setValue(e.target.value)}}
        value={value}
      />    
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>{setShow(!show)}}>{show?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</button>
    </div>
  );
};

export default InputShow;
