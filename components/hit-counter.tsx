'use client';

interface Props {
  dbField?: string;
  counter?: number;
  color?: string;
  background?: string;
  digits?: number;
};

export const HitCounter = ({
  dbField = 'hitcounter',
  counter = 0,
  color = 'F1EBE2', // // bg-indian-khaki-200
  background = '766852', // bg-indian-khaki-700
  digits = 6,
}: Props) => {
  const imgWidth = 58;
  const imgSrc = `/hitcounter?dbField=${dbField}&counter=${counter}&color=${color}&background=${background}&digits=${digits}`;

  return (
    <img width={imgWidth} src={imgSrc} alt='Hitcounter' />
  );
};

// https://github.com/dasveloper/Hitcount.app
// https://github.com/radiantly/hits
