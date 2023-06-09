import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

const GlowingButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <div className="items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
        <button
          onClick={onClick}
          className="rounded-md relative px-7 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
        >
          <span className=" text-indigo-400 group-hover:text-gray-100 transition duration-200">
            {text}
          </span>
        </button>
      </div>
    </div>
  );
};

export default GlowingButton;
