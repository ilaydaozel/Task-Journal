import { getStatusClassName } from '@/app/utils/helper';
import Link from 'next/link';
import React from 'react';

const WeeklyTaskCard = ({ task }: { task: ITask }) => {

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