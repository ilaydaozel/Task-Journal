'use client';


interface EmptyStateProps {
  item: string;
}

const EmptyState = ({ item }: EmptyStateProps) => {
  return (
    <div
      className='
        min-h-screen
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
        bg-secondary-600
      '
    >
      <div className='text-center'>
        <div className='text-2xl text-neutral-500'>
          There are no {item}s.
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
