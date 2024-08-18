import React, { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface TagSelectFieldProps {
  label: string;
  name: string;
  value: string[]; // Assuming multiple values
  options: Option[];
  onChange: (tags: string[]) => void; // Handling selected tags as strings
  required?: boolean;
}

const TagSelectField = ({ label, name, value, options, onChange, required }: TagSelectFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange(selectedOptions); // Pass selected tag IDs as strings
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        multiple // Allows multiple selection
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

export default TagSelectField;
