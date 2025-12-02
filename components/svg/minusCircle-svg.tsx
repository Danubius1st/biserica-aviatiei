interface Props {
  color?: string;
};

export const MinusCircleSVG = ({ color = '#766852' }: Props) => {
  return (
    <svg
      className={`h-5 w-5 text-indian-khaki-700 dark:text-indian-khaki-200 ${color}`}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path
          className='fill-indian-khaki-700'
          opacity='0.15'
          d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
        ></path>
        <path
          className='stroke-indian-khaki-700 dark:stroke-indian-khaki-200'
          d='M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </g>
    </svg>
  );
};
