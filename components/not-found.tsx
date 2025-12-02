'use client';

import React from 'react';

export const NotFound = () => {
  const errorPath = '/assets/images/error/';

  return (
    <div className='relative px-5'>
      <video
        poster={`${errorPath}error404.jpg`}
        preload='auto'
        autoPlay
        loop
      >
        <source src={`${errorPath}error404.mp4`} type='video/mp4' />
        <source src={`${errorPath}error404.ogv`} type='video/ogg' />
        <source src={`${errorPath}error404.webm`} type='video/webm' />
      </video>
      <div className='absolute top-0 left-0 w-full text-center p-0'>
        <h3 className='text-white text-3xl'>
          Căutăm pagina pe care o vrei ... dar nu o găsim 😟
        </h3>
      </div>
    </div>
  );
};
