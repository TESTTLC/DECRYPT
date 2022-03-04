import React from 'react';

interface Props {
  coinTag: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  imageSource: string;
  showTopText?: boolean;
}

const Item: React.FC<Props> = ({
  coinTag,
  title,
  subtitle,
  onClick,
  imageSource,
  showTopText,
}) => {
  return (
    <div className="flex flex-grow flex-col w-full h-96 bg-black bg-opacity-50 relative rounded-md overflow-hidden">
      <img
        src={imageSource}
        alt={title}
        className="h-full aspect-w-1 object-contain object-top pt-4"
      ></img>
      {showTopText && (
        <div className="w-full absolute py-1 top-0 inset-x-0 bg-blue-400 bg-opacity-90 text-white text-xs text-center leading-4">
          <p className="font-poppins text-md font-semibold">Coming Soon</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-between absolute w-full min-h-[9rem] flex-grow py-1 px-3 bottom-0 inset-x-0 bg-gray-700 bg-opacity-70 text-white text-xs leading-4">
        <p className="text-center font-oswald uppercase font-semibold text-xl mb-2">
          {title}
        </p>

        <p className="font-poppins font-medium">{subtitle}</p>
        <button
          onClick={onClick}
          className="w-full mt-2 font-poppins bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl text-white bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
        >
          Stake {coinTag}
        </button>
      </div>
    </div>
  );
};

export default Item;
