"use client";

import TaskCard from '../task/cards/WeeklyTaskCard';
import Button from '@/app/components/formComponents/Button';
import AddTaskForm from '@/app/components/forms/AddTaskForm';
import { useState } from 'react';

const WeekView = ({ week}: { week?: IWeek }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div id="taskListComponent" className="container mx-auto p-8 flex flex-col gap-8 bg-primary">
      <div className='text-right'>
        <Button onClick={openModal} label='Add Task'></Button>      
        <AddTaskForm isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {week && week.tasks.length > 0 ? (
          week.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <p>No tasks found.</p> // Display a message if there are no tasks
        )}
      </div>
    </div>
  );
};

export default WeekView;