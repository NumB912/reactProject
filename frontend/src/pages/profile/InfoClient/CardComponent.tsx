import React from 'react'
import { Link } from 'react-router'

interface CardComponentProps {
  titleContent: string;
  content: string;
  urlContentLink: string;
  contentLink: string;
}


const CardComponent = ({ titleContent, content, urlContentLink, contentLink }: CardComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-6">
      <p className="font-bold text-2xl mb-4">{titleContent}</p>
      <div className="text-center bg-gray-50 p-6 rounded-xl shadow w-full max-w-md">
        <p className="text-gray-400 font-light mb-4">
          {content}
        </p>
        <Link
          to={urlContentLink || "#"}
          className="inline-block bg-black text-white px-4 py-2 rounded  transition"
        >
          {contentLink}
        </Link>
      </div>
    </div>
  );
};


export default CardComponent