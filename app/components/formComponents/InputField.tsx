import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, required = false , type}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value as string}
          onChange={onChange as (event: ChangeEvent<HTMLTextAreaElement>) => void}
          required={required}
          className="border border-gray-300 rounded p-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="border border-gray-300 rounded p-2"
        />
      )}
    
    </div>
  );
};

export default InputField;
