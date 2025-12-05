import React from 'react';
import ButtonBorderSelect from './UI/Button/ButtonBorderSelect';

export interface ButtonSelectProp {
  id: string;
  value: React.ReactNode;
}

interface ButtonSelectManyProp {
  onChange: (option: ButtonSelectProp[]) => void;
  selected: ButtonSelectProp[];
  options: ButtonSelectProp[];
}

const ButtonSelectMany = ({ selected, onChange, options }: ButtonSelectManyProp) => {
  const handleOnClick = (option: ButtonSelectProp) => {
    const isSelected = selected.some((item) => item.id === option.id);

    if (isSelected) {
      onChange(selected.filter((item) => item.id !== option.id));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((option) => (
        <ButtonBorderSelect
          key={option.id}
          value={option}
          onClick={() => handleOnClick(option)}
          active={selected.some((item) => item.id === option.id)}
        >
          {option.value}
        </ButtonBorderSelect>
      ))}
    </div>
  );
};

export default ButtonSelectMany;
