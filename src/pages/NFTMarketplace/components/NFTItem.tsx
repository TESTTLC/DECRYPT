import { useNavigate } from 'react-router-dom';
import { ellipsizeAddress } from 'src/utils/functions/utils';
import { routes } from 'src/utils/routes';

interface Props {
  id: string;
  contractAddress: string;
  imageSource: string;
  title: string;
  price?: number;
  timeLeft: string;
  isSquare?: boolean;
  collectionName: string;
  description?: string;
  onClick?: () => void;
}

const NFTItem: React.FC<Props> = ({
  id,
  contractAddress,
  imageSource,
  title,
  price,
  timeLeft,
  isSquare,
  collectionName,
  description,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      // className={`w-72 h-[28rem] bg-black bg-opacity-70 rounded-xl overflow-hidden col-span-1`}
      className={`relative cursor-pointer bg-black bg-opacity-70 rounded-xl  col-span-1 overflow-hidden`}
    >
      {/* <img
        src={imageSource}
        className={`w-full ${
          isSquare ? 'aspect-h-1' : 'h-72'
        } object-cover rounded-xl" `}
      /> */}
      <div className="w-full aspect-h-1 aspect-w-1">
        <img
          src={imageSource}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex justify-between items-center text-sm">
          <p className="text-blue-500">{title}</p>
          {price && <p className="text-white">{price} (WTLC)</p>}
        </div>
        <div className="flex justify-between items-center xs:text-sm">
          <p className="text-ellipsis overflow-hidden">
            {/* {description || collectionName} */}
            {collectionName}
          </p>
          <p className="text-xs">{ellipsizeAddress(contractAddress, 6)}</p>
        </div>
        <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        <div className="flex flex-col xs:text-sm">
          <p>Expires</p>
          <p className="text-xs text-gray-500">{timeLeft}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
