import { ReactNode, useState } from "react";

export interface ButtonIconProp {
  icon?: ReactNode;
  iconColor?: string;
  children?: React.ReactNode;
  containStyle?: string;
  onClick?: () => void;
}


 const ButtonIcon = ({ icon, children, containStyle, iconColor = "*:text-red-500" }: ButtonIconProp) => {
  const [isIconStyle, setIsIconStyle] = useState(false);

  const handleSet = () => {
    setIsIconStyle(!isIconStyle)
  }

  return (
    <button className={`rounded-full border border-gray-200 p-3 w-24 flex items-center gap-2 cursor-pointer ${containStyle}`} onClick={handleSet}>
      {icon && <span className={`${isIconStyle ? iconColor : ""}`}>{icon}</span>}
      {children}
    </button>
  )
}

export default ButtonIcon