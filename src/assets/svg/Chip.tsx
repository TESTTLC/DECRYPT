import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="28"
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_di_30128_3868)">
      <rect
        x="1"
        y="0.000976562"
        width="29.9996"
        height="25.9993"
        rx="3.7337"
        fill="url(#paint0_linear_30128_3868)"
      />
    </g>
    <mask
      id="mask0_30128_3868"
      maskUnits="userSpaceOnUse"
      x="1"
      y="0"
      width="30"
      height="26"
    >
      <rect
        x="1.12446"
        y="0.124457"
        width="29.7507"
        height="25.7504"
        rx="3.60924"
        fill="url(#paint1_linear_30128_3868)"
        stroke="url(#paint2_linear_30128_3868)"
        strokeWidth="0.248913"
      />
    </mask>
    <g mask="url(#mask0_30128_3868)">
      <rect
        x="10.6861"
        y="8.97716"
        width="10.6276"
        height="8.04414"
        rx="0.933424"
        fill="url(#paint3_linear_30128_3868)"
        stroke="#9B9B9B"
        strokeWidth="0.622283"
      />
      <g filter="url(#filter1_i_30128_3868)">
        <rect
          x="-17.75"
          y="6.80859"
          width="29.9996"
          height="12.3806"
          rx="2.48913"
          fill="url(#paint4_linear_30128_3868)"
        />
      </g>
      <rect
        x="-17.4389"
        y="7.11974"
        width="29.3773"
        height="11.7583"
        rx="2.17799"
        stroke="url(#paint5_linear_30128_3868)"
        strokeWidth="0.622283"
      />
      <g filter="url(#filter2_i_30128_3868)">
        <rect
          x="19.75"
          y="6.80859"
          width="29.9996"
          height="12.3806"
          rx="2.48913"
          fill="url(#paint6_linear_30128_3868)"
        />
      </g>
      <rect
        x="20.0611"
        y="7.11974"
        width="29.3773"
        height="11.7583"
        rx="2.17799"
        stroke="url(#paint7_linear_30128_3868)"
        strokeWidth="0.622283"
      />
    </g>
    <path d="M16 8.97594V0" stroke="#9B9B9B" strokeWidth="0.622283" />
    <path d="M16 25.9994V17.333" stroke="#9B9B9B" strokeWidth="0.622283" />
    <path d="M11.9374 13H1" stroke="#9B9B9B" strokeWidth="0.622283" />
    <path d="M30.9999 13H19.75" stroke="#9B9B9B" strokeWidth="0.622283" />
    <defs>
      <filter
        id="filter0_di_30128_3868"
        x="0.377717"
        y="0.000976562"
        width="31.2446"
        height="27.2436"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.622283" />
        <feGaussianBlur stdDeviation="0.311141" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.38 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_30128_3868"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_30128_3868"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.622283" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_30128_3868"
        />
      </filter>
      <filter
        id="filter1_i_30128_3868"
        x="-17.75"
        y="6.80859"
        width="30"
        height="13.6254"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1.24457" />
        <feGaussianBlur stdDeviation="0.933424" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_30128_3868"
        />
      </filter>
      <filter
        id="filter2_i_30128_3868"
        x="19.75"
        y="6.80859"
        width="30"
        height="13.6254"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1.24457" />
        <feGaussianBlur stdDeviation="0.933424" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_30128_3868"
        />
      </filter>
      <linearGradient
        id="paint0_linear_30128_3868"
        x1="15.9998"
        y1="0.000976562"
        x2="15.9998"
        y2="26.0003"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBE9ED" />
        <stop offset="1" stopColor="#C8C7CE" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_30128_3868"
        x1="15.9998"
        y1="0"
        x2="15.9998"
        y2="25.9993"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBE9ED" />
        <stop offset="1" stopColor="#C8C7CE" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_30128_3868"
        x1="15.9998"
        y1="0"
        x2="15.9998"
        y2="25.9993"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C9CACC" />
        <stop offset="1" stopColor="#A0A6A6" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_30128_3868"
        x1="15.9999"
        y1="8.66602"
        x2="15.9999"
        y2="17.3324"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBE9ED" />
        <stop offset="1" stopColor="#C8C7CE" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_30128_3868"
        x1="-2.75019"
        y1="6.80859"
        x2="-2.75019"
        y2="19.1892"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBE9ED" />
        <stop offset="1" stopColor="#C8C7CE" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_30128_3868"
        x1="-2.75019"
        y1="6.80859"
        x2="-2.75019"
        y2="19.1892"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A9A9A9" />
        <stop offset="1" stopColor="#8A8A8A" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_30128_3868"
        x1="34.7498"
        y1="6.80859"
        x2="34.7498"
        y2="19.1892"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBE9ED" />
        <stop offset="1" stopColor="#C8C7CE" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_30128_3868"
        x1="34.7498"
        y1="6.80859"
        x2="34.7498"
        y2="19.1892"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A9A9A9" />
        <stop offset="1" stopColor="#8A8A8A" />
      </linearGradient>
    </defs>
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
