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
      d="M16.8407 20.1637V6.5459"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.9173 16.0674L16.8395 20.164L12.7617 16.0674"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.91102 3.83301V17.4508"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.83398 7.9287L6.91176 3.83203L10.9895 7.9287"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
