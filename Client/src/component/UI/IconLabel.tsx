import React from "react";

type DirectType = "row" | "column";
type AlignType = "default" | "center" | "right";

interface IconLabelProps {
  Icon?: React.ReactNode;
  Label: string;
  Direct?: DirectType;
  LabelLayout?: AlignType;
  IconLayout?: AlignType;
}

const DirectClasses: Record<DirectType, string> = {
  row: "flex-row items-center",
  column: "flex-col"
};

const TextAlign: Record<AlignType, string> = {
  default: "text-left",
  center: "text-center",
  right: "text-right"
};

const IconLayoutClasses: Record<AlignType, string> = {
  default: "justify-start items-center",
  center: "justify-center items-center",
  right: "justify-end items-center"
};

const IconAndLabel = ({
  Icon,
  Label,
  Direct = "row",
  LabelLayout = "default",
  IconLayout = "default"
}: IconLabelProps) => {
  return (
    <div className={`flex gap-2 ${DirectClasses[Direct]}`}>
      <div className={`flex ${IconLayoutClasses[IconLayout]}`}>
        {Icon}
      </div>
      <p className={`text-sm line-clamp-2 ${TextAlign[LabelLayout]}`}>{Label}</p>
    </div>
  );
};

export default IconAndLabel;
