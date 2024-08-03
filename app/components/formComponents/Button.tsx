'use client';


interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined
}

const Button = ({
  label,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:scale-105
        transition-transform
        text-sm
        p-2
        bg-primary-700
        text-white
        font-semibold
      `}
    >
      {label}
    </button>
  );
};

export default Button;
