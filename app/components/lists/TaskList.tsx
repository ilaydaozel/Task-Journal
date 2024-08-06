import TaskCard from '../views/week/WeeklyTaskCard';

const TasksPage = ({ tasks = [] }: { tasks?: ITask[] }) => {
  const today = new Date();
  return (
    <div className="container mx-auto p-8 flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p>No tasks found.</p> // Display a message if there are no tasks
        )}
      </div>
    </div>
  );
};

export default TasksPage;
