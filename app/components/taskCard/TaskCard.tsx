import Link from 'next/link';

const TaskCard = ({ task }: {task: ITask}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold">{task.name}</h2>
      <p>{task.description}</p>
      <Link href={`/tasks/${task.id}`}>
        <a className="text-blue-500">View Details</a>
      </Link>
    </div>
  );
};

export default TaskCard;
