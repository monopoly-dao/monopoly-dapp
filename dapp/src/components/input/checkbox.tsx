'use client';

import React, { useState } from 'react';
import { IoCheckbox, IoSquareOutline } from 'react-icons/io5';

interface ICheckbox {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleOnChange = (value: boolean) => {
    onChange(value);
    setIsChecked(value);
  };

  return (
    <label className='text-primary-700 flex select-none items-center gap-2 text-sm'>
      <input
        type='checkbox'
        className='hidden'
        checked={isChecked}
        onChange={(e) => handleOnChange(e.target.checked)}
      />
      {isChecked ? <IoCheckbox size={18} /> : <IoSquareOutline size={18} />}
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
