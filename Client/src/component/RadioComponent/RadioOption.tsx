import React from 'react'
interface RadioOptionProps {
    Radioes: { id: string; value: string }[]
    handleChange: (value: string) => void
    nameRadio: string
}
const RadioOption = ({ Radioes, handleChange, nameRadio }: RadioOptionProps) => {
  return (
    <div>
      {Radioes.map((radio) => (
        <label key={radio.id}>
          <input
            type="radio"
            name={nameRadio}
            value={radio.value}
            onChange={() => handleChange(radio.value)}
          />
          {radio.value}
        </label>
      ))}
    </div>
  )
}

export default RadioOption