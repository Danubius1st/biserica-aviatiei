'use client';

import { ArrowLeftSVG } from '@/components/svg/arrowLeft-svg';
import { Tooltip } from 'react-tooltip';

interface Props {
  onClick: () => void;
};

export const ButtonBack = ({ onClick }: Props) => {
  return (
    <>
      <button
        id='btnBack'
        type='button'
        onClick={onClick}
        title='Înapoi'
      >
        <ArrowLeftSVG />
      </button>
      <Tooltip
        anchorSelect='#btnBack'
        content='Înapoi'
        style={{ backgroundColor: 'green', color: 'white' }}
      />
    </>
  );
};
