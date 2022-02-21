import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  onClick: () => void;
  imageSource?: string;
  showTopText?: boolean;
  showPageTitle?: boolean;
  imageContainerStyle?: string;
  imageStyle?: string;
}

const BigButton: React.FC<Props> = ({
  title,
  subtitle,
  onClick,
  imageSource,
  showTopText,
  imageContainerStyle,
  imageStyle,
}) => {
  return (
    <div className="h-full w-full transform duration-500 hover:scale-110">
      {/* <div className="relative xs:w-80 w-72 h-72"> */}
      <div className="relative w-full h-full">
        <div className="\ hover:scale-110 absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-600  rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

        <button
          onClick={onClick}
          className="flex flex-col rounded-lg relative w-full h-full bg-gradient-to-br
           overflow-hidden bg-gray-700 bg-opacity-70"
        >
          {imageSource && (
            <div
              className={`relative w-full ${
                imageContainerStyle ? imageContainerStyle : 'h-1/2'
              }`}
            >
              <img
                alt={`${imageSource}`}
                src={imageSource}
                className={`h-full w-full aspect-w-1 object-cover ${
                  imageStyle ? imageStyle : ''
                }`}
              />
              {showTopText && (
                <div className="absolute w-full py-1 bottom-0 inset-x-0 bg-blue-400 bg-opacity-90 text-white text-xs text-center leading-4">
                  <p className="font-poppins text-md font-semibold">
                    Coming Soon
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="mx-5 mt-2 flex flex-col items-start">
            <p className="text-white font-oswald text-2xl">{title}</p>
            <p className="font-poppins text-white text-left text-sm mt-3 leading-tight font-light">
              {subtitle}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BigButton;
