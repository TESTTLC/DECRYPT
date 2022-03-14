import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="35"
    height="36"
    viewBox="0 0 35 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect opacity="0.2" y="0.5" width="35" height="35" rx="8" fill="#FA2256" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.281 9.80178H13.7368C12.0035 9.79512 10.5826 11.1768 10.5418 12.9093V21.8368C10.5035 23.5976 11.8993 25.0568 13.6601 25.0959C13.686 25.0959 13.711 25.0968 13.7368 25.0959H20.3943C22.1393 25.0251 23.5143 23.5834 23.5018 21.8368V14.1984L19.281 9.80178Z"
      stroke="#FA2256"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.0625 9.79199V12.2162C19.0625 13.3995 20.0192 14.3587 21.2025 14.362H23.4983"
      stroke="#FA2256"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.9062 20.2995H14.4062Z"
      fill="#FA2256"
    />
    <path
      d="M18.9062 20.2995H14.4062"
      stroke="#FA2256"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.2029 17.1715H14.4062Z"
      fill="#FA2256"
    />
    <path
      d="M17.2029 17.1715H14.4062"
      stroke="#FA2256"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
