interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function PrimaryButton({
  label,
  onClick,
  className = '',
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  borderColor = '',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor} ${borderColor} w-full text-center p-1 rounded-xl hover:opacity-90 transition ${className}`}
    >
      <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
    </button>
  );
}
