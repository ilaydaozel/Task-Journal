'use client'

import React, { useState } from 'react';
import TaskList from '../../components/lists/TaskList';
import Button from '@/app/components/formComponents/Button';
import AddTaskForm from '@/app/components/forms/AddTaskForm';


const TaskListPage = ({tasks}:{tasks: ITask[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='flex flex-col items-end gap-2 w-[95vw]'>
      <Button onClick={openModal} label='Add Program'></Button>
      <AddTaskForm isOpen={isModalOpen} onClose={closeModal} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskListPage;
