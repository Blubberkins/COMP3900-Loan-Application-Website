import React from 'react';
import Navbar from '../components/Navbar';

const StartPage = () => {
  return (
    <div>
      <Navbar />
      <div className='grid grid-cols-2'>
        <div>
          <svg
            viewBox='0 0 24 24'
            fill='currentColor'
            height='20em'
            width='20em'
          >
            <path d='M12 15c-1.84 0-2-.86-2-1H8c0 .92.66 2.55 3 2.92V18h2v-1.08c2-.34 3-1.63 3-2.92 0-1.12-.52-3-4-3-2 0-2-.63-2-1s.7-1 2-1 1.39.64 1.4 1h2A3 3 0 0013 7.12V6h-2v1.09C9 7.42 8 8.71 8 10c0 1.12.52 3 4 3 2 0 2 .68 2 1s-.62 1-2 1z' />
            <path d='M5 2H2v2h2v17a1 1 0 001 1h14a1 1 0 001-1V4h2V2H5zm13 18H6V4h12z' />
          </svg>
          <svg
            data-name='Layer 1'
            viewBox='0 0 24 24'
            fill='currentColor'
            height='20em'
            width='20em'
          >
            <path d='M19 4.5H5a3 3 0 00-3 3v9a3 3 0 003 3h14a3 3 0 003-3v-9a3 3 0 00-3-3zm1 12a1 1 0 01-1 1H5a1 1 0 01-1-1v-9a1 1 0 011-1h14a1 1 0 011 1zm-4-6a3 3 0 00-1.51.42 3 3 0 100 5.16A3 3 0 1016 10.5zm-2.83 4a1 1 0 01-.17 0 1 1 0 010-2 1 1 0 01.17 0 2.8 2.8 0 000 1.92zm2.83 0a1 1 0 111-1 1 1 0 01-1 1z' />
          </svg>
          <svg
            fill='currentColor'
            viewBox='0 0 16 16'
            height='20em'
            width='20em'
          >
            <path d='M8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4.5a.5.5 0 00.5-.5v-4h2v4a.5.5 0 00.5.5H14a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v4H2.5z' />
          </svg>
        </div>
        <div className='max-w-lg text-6xl font-semibold leading-normal text-gray-700 mt-5'>
          <p>THE BEST BANK FOR YOUR HOME LOAN</p>
          <p className='mt-20'>GET A QUOTE NOW!!!</p>
          <p className='mt-20'>BOOK A MEETING FOR FREE</p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
