import React, { useState } from 'react'
import {FaSort} from 'react-icons/fa'

interface DropDownProp {
    onClick: (value: string) => void; // truyền giá trị được chọn
    icon?: React.ReactNode;
    containerStyle?: string;
    defaultOption?: string;
    styleOption?: string;
    styleIcon?: string;
    options?: string[];
    styleOptions?: string;
}


const DropDownSelect = ({icon, containerStyle, defaultOption, options, styleOptions, styleOption, styleIcon}:DropDownProp) => {
    const [isOpen, setIsOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState<string | null>(defaultOption || null);
    const defaultContainerStyle = containerStyle || 'w-64';
    const defaultOptionText = defaultOption || 'Select an option';
    const defaultOptionStyle = styleOption || '';
    const defaultStyleIcon = styleIcon || '';
    const defaultStyleOptions = styleOptions || '';
    const defaultOptions = options || ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div className={`relative ${defaultContainerStyle}`} onClick={() => setIsOpen(!isOpen)}>
            <div className={`cursor-pointer select-trigger p-3 bg-white min-w-50 border rounded-sm ${defaultOptionStyle}`}>
                <span className={`select-icon inline-block mr-2 ${defaultStyleIcon}`}>
                    {icon ? icon : ""}
                </span>
                <span className={`select-label`}>{optionSelected || defaultOptionText}</span>
            </div>
            <div className={`select-options absolute bg-white shadow-lg rounded-sm mt-1 w-full z-10 
            ${defaultStyleOptions}
            *:p-3 *:hover:bg-gray-200 *:hover:cursor-pointer
             ${isOpen ? 'block' : 'hidden'}`}>
                {defaultOptions.map((option, index) => (
                    <div className={`select__option ${defaultStyleOptions}`} key={index} onClick={() => setOptionSelected(option)}>
                        {option}
                    </div>
                ))}
            </div>
    </div>
  )
}

export default DropDownSelect