import Link from 'next/link';
import React from 'react';

const WeeklyTaskCard = ({ task }: { task: ITask }) => {
  const getStatusClassName = (status: string | null) => {
    switch (status) {
      case 'to-do':
        return 'bg-yellow-50';
      case 'inProgress':
        return 'bg-gray-100';
      case 'done':
        return 'bg-blue-100';
      default:
        return 'bg-white';
    }
  };
  return (
    <Link href={`/task/${task.id}`}>
      <div className={`w-full p-2 rounded-md shadow-md mb-2 ${getStatusClassName(task.status)}`}>
        <h3 className="font-semibold">{task.name}</h3>
        {/* Add any other task details you'd like to display */}
      </div>
    </Link>
  );
};

export default WeeklyTaskCard;