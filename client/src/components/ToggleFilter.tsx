import React, { useState } from 'react';

interface ToggleFilterProps {
  leftLabel: string;
  rightLabel: string;
  onToggle?: (value: string) => void;
}

const ToggleFilter: React.FC<ToggleFilterProps> = ({ leftLabel, rightLabel, onToggle }) => {
  const [active, setActive] = useState<'left' | 'right'>('left');

  const handleToggle = () => {
    const newValue = active === 'left' ? 'right' : 'left';
    setActive(newValue);
    if (onToggle) {
      onToggle(newValue === 'left' ? leftLabel : rightLabel);
    }
  };

  return (
    <div 
      onClick={handleToggle}
      className="relative bg-gray-100 rounded-full p-1 flex items-center cursor-pointer w-32 select-none border border-gray-200"
    >
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
          active === 'left' ? 'left-1' : 'left-[calc(50%+2px)]'
        }`}
      ></div>
      <div className={`flex-1 text-center text-xs font-semibold z-10 transition-colors ${active === 'left' ? 'text-gray-800' : 'text-gray-400'}`}>
        {leftLabel}
      </div>
      <div className={`flex-1 text-center text-xs font-semibold z-10 transition-colors ${active === 'right' ? 'text-gray-800' : 'text-gray-400'}`}>
        {rightLabel}
      </div>
    </div>
  );
};

export default ToggleFilter;