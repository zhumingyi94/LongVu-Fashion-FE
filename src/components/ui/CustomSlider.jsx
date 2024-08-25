import React, { useState, useEffect } from 'react';

const CustomSlider = ({ min, max, step, defaultValue, onValueChange }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue([min, newValue]);
  };

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default CustomSlider;