import React from "react";

type VariantType = "primary" | "secondary" | "outline";
type RoundedType = "sm" | "md" | "lg" | "xl" | "full" | "none";
type PaddingType = "sm" | "md" | "lg" | "xl" | "none";

interface CardContentProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  variant?: VariantType;
  rounded?: RoundedType;
  padding?: PaddingType;
  className?: string;
}

const variantClasses: Record<VariantType, string> = {
  primary: "bg-black text-white border-black",
  secondary: "bg-gray-200",
  outline: "border bg-white border-gray-300",
};

const roundedClasses: Record<RoundedType, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
  none: "rounded-none",
};

const paddingClasses: Record<PaddingType, string> = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
  none: "p-0",
};

const CardContent: React.FC<CardContentProps> = ({
  title,
  children,
  variant = "primary",
  rounded = "md",
  padding = "none",
  className = "",
}) => {
  return (
    <section
      className={`
        ${variantClasses[variant]}
        ${roundedClasses[rounded]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {title && <header className="p-2 font-medium text-lg">{title}</header>}
      <div className="p-5">{children}</div>
    </section>
  );
};

export default CardContent;
