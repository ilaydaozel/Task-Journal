'use client'

import React, { useState } from 'react';
import TaskList from '../../components/taskList/TaskList';


const TaskListPage = ({tasks}:{tasks: ITask[]}) => {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //const openModal = () => setIsModalOpen(true);
  //const closeModal = () => setIsModalOpen(false);

  return (
    <div className='flex flex-col items-end gap-2 w-[95vw]'>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskListPage;
