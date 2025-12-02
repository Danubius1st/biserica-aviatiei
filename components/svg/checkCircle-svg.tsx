interface Props {
  color?: string;
};

export const CheckCircleSVG = ({ color = '#766852' }: Props) => {
  return (
    <svg
      className='h-5 w-5 text-indian-khaki-700 dark:text-indian-khaki-200'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path
          opacity='0.15'
          d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
          fill={color}
        ></path>
        <path
          d='M17.0001 9L10 16L7 13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </g>
    </svg>
  );
};
