import React, { useEffect, useRef } from 'react';

interface InputLabelToggleProp {
  label: string;
  placeholder: string;
  handleOnChange: (value: string) => void;
  value: string;
  onClear?: () => void; // thêm nút xóa
}

const InputLabelToggle = ({
  label,
  placeholder,
  handleOnChange,
  value,
  onClear,
}: InputLabelToggleProp) => {
  const prevValueRef = useRef<string>(value);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue !== prevValueRef.current) {
      handleOnChange(newValue);
    }
  };

  const handleClear = () => {
    handleOnChange("");
    onClear?.();
  };

  return (
    <div className="flex flex-col border-r border-gray-200 p-2 w-full">
      <p className="text-[15px] font-bold px-2">{label}</p>

      <div className="relative flex items-center">
        <input
          type="text"
          className="border-gray-200 border p-2 w-full pr-10" 
          placeholder={placeholder}
          value={value}
          onChange={handleChange} 
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-1 p-1 w-[30px] h-[30px] rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
          >
            <i className="fa-solid fa-x text-xs"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputLabelToggle;