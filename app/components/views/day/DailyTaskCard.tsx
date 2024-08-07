import { getStatusClassName } from '@/app/utils/helper';
import Link from 'next/link';
import React from 'react';

const DailyTaskCard = ({ task }: { task: ITask }) => {

  return (
    <Link href={`/task/${task.id}`}>
      <div className={`w-full p-6 transition duration-300 hover:translate-y-1 rounded-md shadow-md mb-2 ${getStatusClassName(task.status)}`}>
        <h3 className="font-semibold">{task.name}</h3>
        <h3 className="text-sm">{task.description}</h3>
      </div>
    </Link>
  );
};

export default DailyTaskCard;