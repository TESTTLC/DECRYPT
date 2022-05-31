import GridMenuIcons from 'src/assets/svg/GridMenu';

interface Props {
  isLoading: boolean;
  numberOfResults: number;
}

const MarketplaceHeaderSubHeader: React.FC<Props> = ({
  isLoading,
  numberOfResults,
}) => {
  return (
    <div className="pr-3">
      {!isLoading && <p>{numberOfResults} Results</p>}
      <div className="flex w-full items-center justify-between">
        <div className="flex space-x-2">
          <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-black bg-opacity-70">
            TLC
            <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
              x
            </div>
          </div>
          {/* <button className="text-sm text-blue-500 font-medium">
            Clear all
          </button> */}
        </div>
        <GridMenuIcons />
      </div>
    </div>
  );
};

export default MarketplaceHeaderSubHeader;
