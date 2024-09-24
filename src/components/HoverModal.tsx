import React from "react";

interface Option {
  label: string;
  onClick: () => void;
}

interface HoverModalProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  options: Option[];
  ref?: React.RefObject<HTMLDivElement>;
}

const HoverModal: React.FC<HoverModalProps> = ({ isOpen, position, onClose, options,ref }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-xl"
      style={{ top: position.top, left: position.left }}
      onMouseLeave={onClose}
      ref={ref}
    >

      <div className="py-1 min-w-32 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              option.onClick();
              onClose();
            }}
            className="block px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HoverModal;
