import MarketTrendResults from 'src/assets/svg/MarketTrendResults';

const DailyInfoComponent: React.FC = () => {
  return (
    <div className="flex flex-col justify-between col-span-1 sm:col-span-2 md:col-span-2 w-full">
      <p className="font-bold text-2xl">Good morning, Leonard!</p>
      <p className="text-gray-500 text-[0.65rem] mt-4">
        Now you have full control over your financial instruments
      </p>
      <div className="bg-black bg-opacity-70rounded-xl py-4 w-full xs:w-full rounded-lg">
        <div className="px-8">
          <p>Today</p>
          <p className="text-gray-500 text-xs">Market trend</p>
          <div className="flex space-x-2 text-lg">
            <p className="text-pink-500">68,5%</p>
            <p className="text-[#5EFF5A] bg-green-900 rounded-r-full px-4">
              12%
            </p>
          </div>
          <p className="text-gray-500 text-[0.55rem] mt-2">
            Results provided by the BERT AND GPT3 programs.
          </p>
          <p className="text-gray-500 text-[0.55rem]">
            There results are worthless, do not act on them.
          </p>
        </div>
        <MarketTrendResults width={'100%'} />
        <div className="h-[0.1rem] w-full bg-gray-700 my-4" />
        <div className="flex text-xs items-center px-4 space-x-2">
          <div className="w-2 h-2 rounded-full bg-indigo-700" />
          <p>Communication Platforms</p>
        </div>
        <div className="flex text-xs items-center px-4 space-x-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <p>Streaming meda</p>
        </div>
        <div className="flex text-xs items-center px-4 space-x-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <p>Crypto Volume Aggregators</p>
        </div>
      </div>
    </div>
  );
};

export default DailyInfoComponent;
