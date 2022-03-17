import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || '275'}
    // height={props.width || '180'}
    viewBox={`0 0 ${props.width} ${props.height}`}
    // width="275"
    // height="180"
    // viewBox="0 60 270 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g mask="url(#mask0_29222_3303)">
      <g style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M0 108.086C0 108.086 33.556 76.6895 44.8529 74.3879C56.1498 72.0862 73.4475 105.381 91.9118 104.716C110.376 104.051 125.071 91.9844 137.5 89.6577C149.929 87.331 162.95 107.637 183.824 112.419C204.697 117.202 219.049 68.1971 228.676 64.1813C238.304 60.1655 275 74.3879 275 74.3879"
          stroke="#0595FD"
          stroke-width="3"
          stroke-linecap="round"
        />
      </g>

      <g style={{ mixBlendMode: 'multiply' }}>
        <path
          d="M0 142.418C0 142.418 10.5377 138.028 44.8529 116.495C79.1682 94.9626 80.7667 74.1758 91.9118 74.1758C103.057 74.1758 120.903 109.393 137.5 109.393C154.097 109.393 157.134 87.2612 183.824 90.2657C210.513 93.2701 215.694 113.947 228.676 119.657C241.659 125.367 275 97.3756 275 97.3756"
          stroke="#2662F0"
          stroke-width="3"
          stroke-linecap="round"
        />
      </g>
    </g>
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
