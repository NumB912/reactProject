import React, { use, useEffect } from "react";

interface DropdownProps {
  className?: string;
  children: React.ReactNode;
  handleClose: () => void;
  style?: React.CSSProperties;
}

const Dropdown = ({
  className,
  children,
  handleClose,
  style,
}: DropdownProps) => {
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        handleClose?.();
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);
  return (
    <div
      className={`${className}`}
      ref={dropDownRef}
      style={style}
    >
      {children}
    </div>
  );
};

export default Dropdown;
