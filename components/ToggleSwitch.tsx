import { useState } from 'react';

interface ToggleSwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function ToggleSwitch({
  label,
  checked = false,
  onChange,
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div
          className={`w-10 h-5 rounded-full shadow-inner transition ${
            isChecked ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        />
        <div
          className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
            isChecked ? 'translate-x-full' : ''
          }`}
        />
      </div>
      <span className="text-xs text-gray-400 font-semibold">{label}</span>
    </label>
  );
}
