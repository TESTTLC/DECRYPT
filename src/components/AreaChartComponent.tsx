import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  dataKey?: string;
  first: string;
  second: string;
  showAddressesArea?: boolean;
  showTransactionsArea?: boolean;
}

const AreaChartComponent: React.FC<Props> = ({
  data,
  //   dataKey,
  first,
  second,
  showAddressesArea = true,
  showTransactionsArea = true,
}) => {
  return (
    <ResponsiveContainer minWidth={200} width={'100%'} height={200}>
      <AreaChart
        //   width={1075}
        //   className="w-full"
        // width={536}
        // height={200}
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ff003e" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff003e" stopOpacity={0} />
        </linearGradient> */}
        </defs>
        <XAxis dataKey="name" fontSize={0} />
        <YAxis />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip labelStyle={{ color: 'gray' }} />
        {showAddressesArea && (
          <Area
            type="monotone"
            dataKey={'addrTotal'}
            stroke="#2edcff"
            colorProfile="red"
            fillOpacity={0.2}
            // fill={`url(${'#color' + dataKey})`}
            name={first}
            label={'Total Addresses'}
          />
        )}
        {showTransactionsArea && (
          <Area
            type="monotone"
            dataKey={'txTotal'}
            stroke="#00ef54"
            colorProfile="red"
            fillOpacity={0.2}
            // fill={`url(${'#color' + dataKey})`}
            name={second}
            label={'Total Transactions'}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
