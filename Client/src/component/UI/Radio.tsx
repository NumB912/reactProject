import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
const Radiod = () => {
    const [value, setValue] = useState('female');
  return (
<FormControl>
  <FormLabel id="gender-label">Giới tính</FormLabel>
  <RadioGroup
    row
    name="gender"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    aria-labelledby="gender-label"
  >
    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
    <FormControlLabel value="male" control={<Radio />} label="Nam" />
    <FormControlLabel value="other" control={<Radio />} label="Khác" />
  </RadioGroup>
</FormControl>
  )
}

export default Radiod