import GridMenuIcons from 'src/assets/svg/GridMenu';

const MarketplaceHeaderSubHeader: React.FC = () => {
  return (
    <div className="pr-3">
      <p>1,548,931 Results</p>
      <div className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-black bg-opacity-70">
            ETH
            <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
              x
            </div>
          </div>
          <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-black bg-opacity-70">
            BNB
            <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
              x
            </div>
          </div>
          <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-black bg-opacity-70">
            TLC
            <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
              x
            </div>
          </div>
          <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-black bg-opacity-70">
            FTM
            <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
              x
            </div>
          </div>
          <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-black bg-opacity-70">
            SOL
            <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
              x
            </div>
          </div>
          <button className="text-sm text-blue-500 font-medium">
            Clear all
          </button>
        </div>
        <GridMenuIcons />
      </div>
    </div>
  );
};

export default MarketplaceHeaderSubHeader;
