import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'src/utils/routes';

interface Props {
  id: string;
  imageSource: string;
  title: string;
  price?: number;
  timeLeft: string;
  isSquare?: boolean;
  collectionName: string;
  collectionTotalCount?: number;
  contractAddress: string;
  onClick: () => void;
}

const ProfileNFTItem: React.FC<Props> = ({
  id,
  imageSource,
  title,
  price,
  timeLeft,
  isSquare,
  collectionName,
  collectionTotalCount,
  contractAddress,
  onClick,
}) => {
  console.log('contractAddress: ', contractAddress);
  return (
    <div
      key={`${id}-${collectionName}`}
      // className={`w-72 h-[28rem] bg-black bg-opacity-70 rounded-xl overflow-hidden col-span-1`}
      className={`cursor-pointer bg-black bg-opacity-70 rounded-xl overflow-hidden col-span-1`}
      onClick={onClick}
    >
      <div className="w-full aspect-h-1 aspect-w-1">
        <img
          src={imageSource}
          // onLoadStart={() => {}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center text-sm">
          <p className="text-blue-500">{collectionName}</p>
          {/* <p className="text-gray-500">Price</p> */}
        </div>
        <div className="flex justify-between items-center xs:text-sm">
          <p>{title}</p>
          {/* <p>${price}</p> */}
        </div>
        <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        <div className="flex justify-between items-center text-sm">
          <p>Token ID</p>
          <p className="text-sm text-gray-500">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileNFTItem;
