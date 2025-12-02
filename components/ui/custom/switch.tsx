'use client';

import React from 'react';

interface Props {
  onChange: () => void;
  checked: boolean;
  reverse?: boolean;
  label?: React.ReactNode;
  className?: string;
}

export const Switch = ({
  onChange,
  checked,
  reverse = false,
  label,
  className = ''
}: Props) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      {label && (
        <div className={`${className} dark:text-indian-khaki-800`}>{label}</div>
      )}
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='sr-only peer'
        />
        <div className={`
          w-12 h-7 rounded-full border-2 transition-all duration-200 ease-in-out relative
          ${reverse
            ? 'border-indian-khaki-900 peer-checked:border-yellow-400'
            : 'border-yellow-400 peer-checked:border-indian-khaki-900'
          }
          bg-indian-khaki-700
        `}>
          <span className={`
            absolute top-0.5 h-5 w-5 rounded-full border border-gray-300
            bg-indian-khaki-50 shadow-md transition-all duration-200 ease-in-out
            ${reverse
              ? `right-0.5 peer-checked:left-0.5 peer-checked:right-auto ${checked ? 'left-0.5 right-auto' : 'right-0.5'}`
              : `left-0.5 peer-checked:right-0.5 peer-checked:left-auto ${checked ? 'right-0.5 left-auto' : 'left-0.5'}`
            }
          `} />
        </div>
      </label>
    </div>
  );
};
