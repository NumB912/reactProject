import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormLabel, FormGroup } from '@mui/material'

interface CheckBoxProp {
  value: string
  label: string
}

interface CheckBoxOptionProp {
  options: CheckBoxProp[]
  label?: string
  id: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checkedValues?: string[] 
}

const CheckboxOption = ({ options, label, id, name, onChange, checkedValues = [] }: CheckBoxOptionProp) => {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel id={id}>{label}</FormLabel>
      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
          
            key={opt.value}
            control={
              <Checkbox
                name={name}
                value={opt.value}
                onChange={onChange}
                checked={checkedValues.includes(opt.value)}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default CheckboxOption
