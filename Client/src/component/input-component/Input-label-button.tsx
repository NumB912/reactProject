import React from 'react'

interface InputLabelToggleProp{
    label:string,
    placeholder:string,
    handleOnChange:()=>void;
}

const InputLabelToggle = ({label,placeholder,handleOnChange}:InputLabelToggleProp) => {
  return (
    <div className="flex flex-col border-r border-gray-200 p-2 w-full">
        <p className="text-[15px] font-bold px-2">{label}</p>

        <div className="relative flex items-center">
          <input
            type="text"
            className="border-gray-200 border p-2 w-full"
            placeholder={placeholder}
            onChange={handleOnChange}
          />
          <button
            type="button"
            className="absolute right-1 p-1 w-[30px] rounded-[10px] bg-black text-white"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
  )
}

export default InputLabelToggle