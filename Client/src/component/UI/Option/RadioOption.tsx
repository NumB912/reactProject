import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export interface RadioProp {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioOptionProps {
  name: string;
  id: string;
  label?: string;
  value: string;
  options: RadioProp[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  row?: boolean; 
}

const RadioOption: React.FC<RadioOptionProps> = ({
  name,
  id,
  label,
  value,
  options,
  onChange,
  row = false,
}) => {
  return (
    <FormControl>
      {label && <FormLabel id={id}>{label}</FormLabel>}
      <RadioGroup
        aria-labelledby={id}
        name={name}
        value={value}
        onChange={onChange}
        row={row}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
            disabled={opt.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioOption;
