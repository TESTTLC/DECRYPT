import LineChart from 'src/assets/svg/LineChart';

interface Props {
  coinTag: 'TLX' | 'TLC';
}
const AnalysisComponent: React.FC<Props> = ({ coinTag }) => {
  return (
    <div>
      <p className="text-xl">Market Analysis {coinTag}</p>

      <div className="bg-black bg-opacity-70 rounded-xl py-4 mt-2 w-full">
        <LineChart width={'100%'} />
        <div className="px-2 mt-4">
          <div className="bg-[#171726] shadow-innerWhite rounded-xl px-2 py-4">
            <div className="flex w-full justify-between items-center">
              <p className="text-lg font-medium">${coinTag} 1000</p>
              <p className="text-xs bg-gradient-to-b from-[#CF21FE] via-[#CF21FE] to-black px-2 py-1 rounded-full font-medium text-[#5EFF5A]">
                Interest Reward 13%5
              </p>
            </div>
            <div className="flex w-full justify-between items-center text-xs mt-1">
              <p className="font-medium">Asset</p>
              <p className="font-medium">Reward</p>
              <p className="font-medium">Term</p>
            </div>
            <div className="flex w-full justify-between items-center text-xs">
              <p className="font-medium">${coinTag}</p>
              <p className="font-medium">135/week</p>
              <p className="font-medium">3 months</p>
            </div>
            <button className="bg-gradient-to-r from-green-400 to-blue-600 rounded-full w-full py-1.5 font-medium text-sm mt-4">
              Invest now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisComponent;
