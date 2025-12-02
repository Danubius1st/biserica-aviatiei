'use client';

import { useA2HS } from '@/hooks/use-A2HS';

export const A2HS = () => {
  const [promptEvent, promptToInstall] = useA2HS();

  return (
    <div>
      {promptEvent && (
        <button
          className='group fixed mt-20 ml-5 inline-flex cursor-pointer items-center justify-center rounded border-b-2 border-l border-indian-khaki-800 bg-linear-to-tr from-indian-khaki-600 to-indian-khaki-500 px-2 py-1 shadow-lg active:border-indian-khaki-600 active:shadow-none z-30'
          onClick={promptToInstall}
        >
          <span className='absolute h-0 w-0 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-32 group-hover:w-32'></span>
          <span className='relative text-xs text-white'>
            Instalați aplicația pe ecran ?
          </span>
        </button>
      )}
    </div>
  );
};
