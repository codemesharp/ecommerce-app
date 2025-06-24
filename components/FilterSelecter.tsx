'use client';

import { useState } from 'react';
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterSelectorProps {
  selected: string[];
  options: string[];
  onChange: (newSelected: string[]) => void;
}

export default function FilterSelector({
  selected,
  options,
  onChange,
}: FilterSelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (type: string) => {
    const updated = selected.includes(type)
      ? selected.filter((t) => t !== type)
      : [...selected, type];
    onChange(updated);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 flex justify-between items-center hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-xs">Filter</span>
        </div>
        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-3">
          {options.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 py-1 text-sm text-gray-600 cursor-pointer hover:text-black"
            >
              <input
                type="checkbox"
                checked={selected.includes(type)}
                onChange={() => toggleOption(type)}
                className="rounded border-gray-300"
              />
              {type}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
