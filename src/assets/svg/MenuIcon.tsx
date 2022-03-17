import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.53852 0.5H5.92449C7.32676 0.5 8.46301 1.64585 8.46301 3.05996V6.47452C8.46301 7.88864 7.32676 9.03449 5.92449 9.03449H2.53852C1.13626 9.03449 0 7.88864 0 6.47452V3.05996C0 1.64585 1.13626 0.5 2.53852 0.5ZM2.53852 11.9655H5.92449C7.32676 11.9655 8.46301 13.1114 8.46301 14.5255V17.94C8.46301 19.3532 7.32676 20.5 5.92449 20.5H2.53852C1.13626 20.5 0 19.3532 0 17.94V14.5255C0 13.1114 1.13626 11.9655 2.53852 11.9655ZM17.4615 11.9655H14.0755C12.6732 11.9655 11.537 13.1114 11.537 14.5255V17.94C11.537 19.3532 12.6732 20.5 14.0755 20.5H17.4615C18.8637 20.5 20 19.3532 20 17.94V14.5255C20 13.1114 18.8637 11.9655 17.4615 11.9655Z"
      fill="white"
    />
    <path
      opacity="0.4"
      d="M14.0737 0.5H17.4596C18.8619 0.5 19.9982 1.64585 19.9982 3.05996V6.47452C19.9982 7.88864 18.8619 9.03449 17.4596 9.03449H14.0737C12.6714 9.03449 11.5352 7.88864 11.5352 6.47452V3.05996C11.5352 1.64585 12.6714 0.5 14.0737 0.5Z"
      fill="white"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
