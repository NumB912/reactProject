import { IconName } from "@fortawesome/fontawesome-svg-core";
import React, { JSX } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


library.add(fas);

interface IconProps {
  name?: IconName;
  className?: string;
  size?: number;
}


const Icon = ({ name="heart", className = "", size = 24 }: IconProps) => {

  return (
    <FontAwesomeIcon
      icon={["fas", name]}
      className={`aspect-square ${className}`}
      style={{ fontSize: size }}
      
    />
  );
};

export default Icon;
