import React from 'react';

interface Props {
  collectionImageSource: string;
  collectionUserImageSource: string;
  title: string;
  description: string;
}

const NFTCategoryItem: React.FC<Props> = ({
  collectionImageSource,
  collectionUserImageSource,
  title,
  description,
}) => {
  return (
    <div className="bg-black bg-opacity-70 rounded-xl pb-2">
      <img
        src={collectionImageSource}
        className="w-full aspect-h-1 object-cover rounded-xl"
      />

      <div className="relative p-4 flex flex-col space-y-4">
        <img
          src={collectionUserImageSource}
          className="absolute -top-12 w-24 h-24 object-cover rounded-full self-center"
        />
        <div className="flex col items-center justify-center">
          <div className="flex justify-between items-center text-md mt-5">
            <p className="text-center">{title}</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm text-center">{description}</p>
      </div>
    </div>
  );
};

export default NFTCategoryItem;
