import React from 'react'
interface inputSquareProp{
    placeHolder?:string,
    value?:string,
    setValue?:string
}
 const InputSquare = ({placeHolder,value,setValue}:inputSquareProp) => {
  return (
        <div className="relative w-full flex justify-center items-center">
          <i className="fa-solid fa-plane-departure absolute left-6"></i>
          <input
            type="text"
            placeholder={placeHolder}
            className="m-auto border border-gray-300 shadow-md rounded-md w-full p-4
                  max-sm:border-b 
                  max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
          />
        </div>
  )
}

export default InputSquare