import { useState } from "react";
const HeartFavorite = ({ style = "" }) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <div
      className={`cursor-pointer flex bg-white p-2 items-center justify-center absolute top-0 right-0 m-2 rounded-full ${style}`}
      onClick={(e) => {
        e.stopPropagation();
        setFavorite(!favorite);
      }}
    >
      {favorite ? (
        <i className="fa-solid fa-heart text-red-500"></i>
      ) : (
        <i className="fa-regular fa-heart"></i>
      )}
    </div>
  );
};



export default HeartFavorite