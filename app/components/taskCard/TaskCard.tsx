import Link from 'next/link';

const TaskCard = ({ task }: {task: ITask}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold">{task.name}</h2>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">
        Deadline: {task.deadline && new Date(task.deadline).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      <Link href={`/tasks/${task.id}`} className="mt-2 inline-block bg-blue-500 text-white rounded px-4 py-2 text-sm">
          View Details
      </Link>
    </div>
  );
};

export default TaskCard;
