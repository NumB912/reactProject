import React, { ReactNode } from 'react'
interface SearchFilterProp{
  children:React.ReactNode;
  className?:string;
}
const SearchFilter = ({children,className}:SearchFilterProp) => {
  return (
    <div className={`w-full gap-1 flex items-end rounded-xl shadow-sm bg-gray-50/50 border border-gray-200 p-5 ${className}`}>
      
      {children}
    </div>
  )
}

export default SearchFilter