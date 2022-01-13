import React from "react";

interface Props {
  customStyles?: string;
}

/**
 *
 * @param children -> A html element
 * @returns the wrapper with the glowing effect containing the children
 */
const GlowingWrapper: React.FC<Props> = ({ children, customStyles }) => {
  return (
    <div className={`${customStyles}`}>
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
        {children}
      </div>
    </div>
  );
};

export default GlowingWrapper;
