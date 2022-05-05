import React from 'react';
//@ts-ignore
import EllipsisText from 'react-ellipsis-text';

interface Props {
  id: string;
  imageSource: string;
  isSquare?: boolean;
  onClick: () => void;
  name: string;
  collectionTotalCount?: number;
  description: string;
}

const ProfileNFTCollection: React.FC<Props> = ({
  description,
  id,
  imageSource,
  isSquare,
  onClick,
  name,
  collectionTotalCount,
}) => {
  return (
    <div
      key={`${id}-${name}`}
      // className={`w-72 h-[28rem] bg-black bg-opacity-70 rounded-xl overflow-hidden col-span-1`}
      className={`min-h-[20rem] cursor-pointer bg-black bg-opacity-70 rounded-xl overflow-hidden col-span-1`}
      onClick={onClick}
    >
      <div className="w-full aspect-h-1 aspect-w-1">
        <img
          src={imageSource}
          // onLoadStart={() => {}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="py-4 relative flex flex-col space-y-2">
        <div className="flex absolute -top-6 bg-black bg-opacity-85 w-full justify-start items-center text-sm text-center px-2 py-3 rounded-lg">
          <p className="text-white text-[1rem] text-center w-full">{name}</p>
          {/* <p className="text-gray-500">Price</p> */}
        </div>
        <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent px-4" />
        <div className="flex text-xs px-4 pt-2 text-center items-center">
          <EllipsisText
            text={
              'OneOnes is a collection of 6565 companions that will transport you to the hidden Magical World. The OneOnes is an NFT project built on storytelling and interaction expanding the Magical World created by Migrating Lines in his 1/1 art. From a technical perspective, the OneOnes are minted on the Ethereum blockchain as a unique, non-fungible token (NFT). This project is born by merging the 1/1 art world and the pfp collectible world. There are a total of 8 Core Families of OneOnes and several 1/1 Celestial OneOnes that will be unleashed!' ||
              ''
            }
            length={82}
          />

          {/* <p className="w-full">
            {ellipsizeText(
              'OneOnes is a collection of 6565 companions that will transport you to the hidden Magical World. The OneOnes is an NFT project built on storytelling and interaction expanding the Magical World created by Migrating Lines in his 1/1 art. From a technical perspective, the OneOnes are minted on the Ethereum blockchain as a unique, non-fungible token (NFT). This project is born by merging the 1/1 art world and the pfp collectible world. There are a total of 8 Core Families of OneOnes and several 1/1 Celestial OneOnes that will be unleashed!',
              80,
            )}
          </p> */}
          {/* <p>${price}</p> */}
        </div>
        <div className="flex justify-between items-center xs:text-sm">
          {/* <p>Token ID</p>
          <p className="text-sm text-gray-500">{id}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileNFTCollection;
