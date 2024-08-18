import React from 'react';

interface FormatButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const FormatButton: React.FC<FormatButtonProps> = ({ onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 border active:bg-todo focus:bg-todo border-todo border-1 rounded cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
      title={label}
    >
      {icon}
    </button>
  );
};

export default FormatButton;
