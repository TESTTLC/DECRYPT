import { TailSpin } from 'react-loader-spinner';

interface Props {
  height: number;
  width: number;
  color?: string;
}
const LoadingSpinner: React.FC<Props> = ({ height, width, color }) => {
  return <TailSpin color={color || '#fff'} height={height} width={width} />;
};

export default LoadingSpinner;
