import React from 'react'

interface ListItemProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, style, className }) => {
  return (
        <div
            className={`bg-white flex flex-col *:hover:bg-gray-200 *:p-3 border border-gray-200 cursor-pointer *:text-sm ${className}`}
            style={style}
          >
            {children}
          </div>
  )
}

export default ListItem