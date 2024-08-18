import React, { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SelectField = ({ label, name, value, options, onChange, required }: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
