import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    baseProfile="basic"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33.9 31.3"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#E17726"
      stroke="#E17726"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M32.1.1 18.9 9.8l2.4-5.7 10.8-4z"
    />
    <path
      fill="#E27625"
      stroke="#E27625"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1.8.1 13 9.8-2.3-5.8L1.8.1zM27.4 22.7 23.9 28l7.5 2.1 2.1-7.3-6.1-.1zM.4 22.8l2.1 7.3L10 28l-3.5-5.3-6.1.1z"
    />
    <path
      fill="#E27625"
      stroke="#E27625"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.6 13.6-2.1 3.1 7.4.3-.2-8-5.1 4.6zM24.3 13.6 19.1 9l-.2 8.1 7.4-.3-2-3.2zM10 28l4.5-2.2-3.9-3L10 28zM19.4 25.8l4.5 2.2-.6-5.2-3.9 3z"
    />
    <path
      fill="#D5BFB2"
      stroke="#D5BFB2"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m23.9 28-4.5-2.2.4 2.9v1.2l4.1-1.9zM10 28l4.2 2v-1.2l.4-2.9L10 28z"
    />
    <path
      fill="#233447"
      stroke="#233447"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.2 20.9-3.7-1.1 2.6-1.2 1.1 2.3zM19.6 20.9l1.1-2.3 2.6 1.2-3.7 1.1z"
    />
    <path
      fill="#CC6228"
      stroke="#CC6228"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10 28 .6-5.3-4.1.1L10 28zM23.2 22.7l.6 5.3 3.5-5.2-4.1-.1zM26.4 16.8l-7.4.3.7 3.8 1.1-2.3 2.6 1.2 3-3zM10.5 19.8l2.6-1.2 1.1 2.3.7-3.8-7.4-.3 3 3z"
    />
    <path
      fill="#E27525"
      stroke="#E27525"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.5 16.8 3.1 6.1-.1-3-3-3.1zM23.4 19.8l-.1 3 3.1-6.1-3 3.1zM14.9 17.1l-.7 3.8.9 4.5.2-5.9-.4-2.4zM18.9 17.1l-.4 2.4.2 5.9.9-4.5-.7-3.8z"
    />
    <path
      fill="#F5841F"
      stroke="#F5841F"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.6 20.9-.9 4.5.6.4 3.9-3 .1-3-3.7 1.1zM10.5 19.8l.1 3 3.9 3 .6-.4-.9-4.5-3.7-1.1z"
    />
    <path
      fill="#C0AC9D"
      stroke="#C0AC9D"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.7 30v-1.2l-.3-.3h-5l-.3.3V30L10 28l1.5 1.2 2.9 2h5.1l3-2 1.4-1.2-4.2 2z"
    />
    <path
      fill="#161616"
      stroke="#161616"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.4 25.8-.6-.4h-3.7l-.6.4-.4 2.9.3-.3h5l.3.3-.3-2.9z"
    />
    <path
      fill="#763E1A"
      stroke="#763E1A"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m32.6 10.5 1.1-5.4-1.7-5-12.6 9.4 4.9 4.1 6.9 2 1.5-1.8-.7-.4 1.1-1-.8-.6 1.1-.8-.8-.5zM.1 5.1l1.1 5.4-.7.5 1.1.8-.8.6 1.1 1-.7.5 1.5 1.8 6.9-2 4.9-4.1L1.8.1l-1.7 5z"
    />
    <path
      fill="#F5841F"
      stroke="#F5841F"
      strokeWidth={0.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m31.2 15.6-6.9-2 2.1 3.1-3.1 6.1 4.1-.1h6.1l-2.3-7.1zM9.6 13.6l-6.9 2-2.3 7.1h6.1l4.1.1-3.1-6.1 2.1-3.1zM18.9 17.1l.4-7.6 2-5.4h-8.9l2 5.4.4 7.6.2 2.4v5.9h3.7v-5.9l.2-2.4z"
    />
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
