import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioProp {
  value: string;
  label: React.ReactNode;
}

interface RadioOptionProps {
  name: string;
  id: string;
  label?: string;
  value: string;
  options: RadioProp[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  name,
  id,
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioOption;
