import { IconName } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import Icon from "./Icon";

type DirectType = "row" | "column";
type AlignType = "default" | "center" | "right";
interface IconLabelProps {
  name?: IconName;
  sizeIcon?: number;
  Label: React.ReactNode;
  Direct?: DirectType;
  LabelLayout?: AlignType;
  IconLayout?: AlignType;
  className?: string;
}

const DirectClasses: Record<DirectType, string> = {
  row: "flex-row items-center",
  column: "flex-col items-center",
};

const TextAlign: Record<AlignType, string> = {
  default: "text-left",
  center: "text-center",
  right: "text-right",
};

const IconAlign: Record<AlignType, string> = {
  default: "text-left",
  center: "text-center",
  right: "text-right",
};

const IconAndLabel = ({
  name = "check",
  Label,
  Direct = "row",
  LabelLayout = "default",
  IconLayout = "default",
  sizeIcon = 16,
  className = "",
}: IconLabelProps) => {
  return (
    <div className={`flex gap-2 ${DirectClasses[Direct]} ${className}`}>
      <Icon name={name} size={sizeIcon} className={IconAlign[IconLayout]} />
      <p className={`text-sm line-clamp-2 ${TextAlign[LabelLayout]}`}>
        {Label}
      </p>
    </div>
  );
};

export default IconAndLabel;
