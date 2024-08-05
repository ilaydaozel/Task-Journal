import Link from 'next/link';
import React from 'react';

const DailyTaskCard = ({ task }: { task: ITask }) => {
  const getStatusClassName = (status: string | null) => {
    switch (status) {
      case 'to-do':
        return 'bg-todo';
      case 'inProgress':
        return 'bg-inProgress';
      case 'done':
        return 'bg-done';
      default:
        return 'bg-white';
    }
  };
  return (
    <Link href={`/task/${task.id}`}>
      <div className={`w-full p-6 rounded-md shadow-md mb-2 bg-inProgress ${getStatusClassName(task.status)}`}>
        <h3 className="font-semibold">{task.name}</h3>
        <h3 className="font-semibold">{task.description}</h3>
      </div>
    </Link>
  );
};

export default DailyTaskCard;