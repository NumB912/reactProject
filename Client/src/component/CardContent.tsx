import React from "react";

interface CardContent {
    children: React.ReactNode;
    title?:string;
}

const CardContent: React.FC<CardContent> = ({title="", children }) => {
  return (
    <div className="introduce shadow p-4 border border-gray-200 rounded">
      {title && <p className="text-2xl font-bold">{title}</p>}
      {children}
    </div>
  );
};

export default CardContent;
