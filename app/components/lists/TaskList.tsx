import TaskCard from '../task/cards/WeeklyTaskCard';
import Button from '@/app/components/formComponents/Button';
import AddTaskForm from '@/app/components/forms/AddTaskForm';
import { useState } from 'react';

const TasksPage = ({ tasks = [] }: { tasks?: ITask[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div id="taskListComponent" className="container mx-auto p-8 flex flex-col gap-8">
      <div className='text-right'>
        <Button onClick={openModal} label='Add Task'></Button>      
        <AddTaskForm isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
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
