const Task = ({ task }: { task: ITask }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{task.name}</h1>
      <p className="mt-2">Description: {task.description}</p>
      <p className="mt-2">Acceptance Criteria: {task.acceptanceCriteria}</p>
      <p className="mt-2">Deadline: {task.deadlineAt && new Date(task.deadlineAt).toLocaleDateString()}</p>
      <p className="mt-2">Status: {task.status}</p>
      <h2 className="mt-4 text-xl font-semibold">Comments</h2>
      <ul className="mt-2">
        {task.comments && task.comments.length > 0 ? (
          task.comments.map((comment, index) => (
            <li key={index} className="mt-1">{comment}</li>
          ))
        ) : (
          <li>No comments yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Task;
