const Task = ({ task }: { task: ITask }) => {
  return (
    <div className="w-4/5">
      <h1 className="text-3xl font-bold text-secondary-600">{task.name}</h1>
      <p className="mt-2 text-gray-700">
        <strong>Description:</strong> {task.description || "No description available."}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Acceptance Criteria:</strong> {task.acceptanceCriteria || "No acceptance criteria provided."}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Start Date:</strong> {task.startedAt ? new Date(task.startedAt).toLocaleDateString() : "No start date set."}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Completed At:</strong> {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : "Not completed yet."}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Deadline:</strong> {task.deadlineAt ? new Date(task.deadlineAt).toLocaleDateString() : "No deadline set."}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Status:</strong> <span className={`font-semibold ${task.status === 'done' ? 'text-green-500' : task.status === 'in progress' ? 'text-yellow-500' : 'text-red-500'}`}>{task.status}</span>
      </p>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">Comments</h2>
      <ul className="mt-2 list-disc list-inside">
        {task.comments && task.comments.length > 0 ? (
          task.comments.map((comment, index) => (
            <li key={index} className="mt-1 text-gray-600">{comment}</li>
          ))
        ) : (
          <li className="text-gray-500">No comments yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Task;
