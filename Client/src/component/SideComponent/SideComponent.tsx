import React from 'react'
interface SideComponentProp{
  children:React.ReactNode
}
const SideComponent = ({children}:SideComponentProp) => {
  return (
       <div className="max-lg:hidden w-full flex flex-col justify-start items-center bg-gray-50/50 border border-gray-200 shadow-md p-5 *:font-bold *:w-full gap-5 *:py-1 ">
          {children}
      </div>
  )
}

export default SideComponent