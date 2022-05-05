import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.634 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.391 14.0168L11 11.9938V7.63281"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
