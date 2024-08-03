import React from 'react';
export default function Loading() {
  return (
    <div className='min-h-screen max-w-screen flex items-center justify-center z-30 bg-primary-300'>
      <div className='text-center'>
        <p className='text-3xl font-semibold mt-4 text-white'>
          Loading..
        </p>
      </div>
    </div>
  );
}
