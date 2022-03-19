import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
}

const NFTCategoryItem: React.FC<Props> = ({ category }) => {
  const navigate = useNavigate();
  const { id, image, userImage, title, description } = category;
  return (
    <button
      className="bg-black bg-opacity-70 rounded-xl pb-2"
      onClick={() =>
        navigate(`/nftmarketplace/category/${id}`, {
          state: { categoryTitle: title },
        })
      }
    >
      <img src={image} className="w-full aspect-h-1 object-cover rounded-xl" />

      <div className="relative p-4 flex flex-col space-y-4">
        <img
          src={userImage}
          className="absolute -top-12 w-24 h-24 object-cover rounded-full self-center"
        />
        <div className="flex col items-center justify-center">
          <div className="flex justify-between items-center text-md mt-5">
            <p className="text-center">{title}</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm text-center">{description}</p>
      </div>
    </button>
  );
};

export default NFTCategoryItem;
