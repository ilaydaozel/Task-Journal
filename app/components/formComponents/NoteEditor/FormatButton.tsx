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
      className="px-2 py-1 hover:bg-todo border border-todo border-1 rounded"
      title={label}
    >
      {icon}
    </button>
  );
};

export default FormatButton;
