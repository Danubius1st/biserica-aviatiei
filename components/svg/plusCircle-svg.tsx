interface Props {
  color?: string;
};

export const PlusCircleSVG = ({ color = '#766852' }: Props) => {
  return (
    <svg
      className={`h-5 w-5 text-indian-khaki-700 dark:text-indian-khaki-200 ${color}`}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g stroke={color} strokeWidth='2'
        strokeLinejoin='round'>
        <path
          d='M9 12H15'
        ></path>
        <path
          d='M12 9L12 15'
        ></path>
        <path
          d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
        ></path>
      </g>
    </svg>
  );
};
