import React, { ReactNode } from 'react'
interface ContentLabelProp{
    title:string,
    children:ReactNode,
}
const ContentLabel = ({title,children}:ContentLabelProp) => {
  return (
    <div className='w-full'>
        <div className='label mb-3'>
            <p className='font-semibold text-lg'>{title}</p>
        </div>

        <div className='content'>
                {children}
        </div>
    </div>
  )
}

export default ContentLabel