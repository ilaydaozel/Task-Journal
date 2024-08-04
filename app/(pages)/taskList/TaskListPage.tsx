'use client'

import React, { useState } from 'react';
import TaskList from '../../components/lists/TaskList';

const TaskListPage = ({tasks}:{tasks: ITask[]}) => {
  return (
    <div className='flex flex-col items-end gap-2 w-[95vw]'>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskListPage;
