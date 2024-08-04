'use client';

import Button from '@/app/components/formComponents/Button';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className='grid gap-y-10 w-full h-screen bg-white place-content-center place-items-center'>
      <div className='grid gap-y-4 place-items-center'>
        <p className='text-md text-center text-gray-500 sm:text-xl'>
          An error occurred 🥲
        </p>
        <p className='text-2xl text-center font-bold text-gray-900 sm:text-3xl'>
        {error.message}
        </p>
      </div>
      <div className='flex gap-x-4 w-full justify-center items-center'>
        <Button
          onClick={() => window.location.reload()}
          label="Reload"
        />
        <Button
          onClick={() => window.location.replace('/')}
          label="Go Home"
        />
      </div>
    </div>
  );
}
