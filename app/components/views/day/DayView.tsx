"use client";

import { printStringDateDMYD } from '@/app/utils/Helper';
import DailyTaskCard from './DailyTaskCard';

const DayView = ({day}: { day?: IDay }) => {

  return (
    <div id="taskListComponent" className="w-full min-h-screen flex flex-col gap-4 items-center mx-auto p-10 md:px-24 md:py-10 bg-white">
      <h1 className='md:text-2xl text-lg font-bold font-serif text-text1-700 py-2 px-4'>{printStringDateDMYD(day?.date)}</h1>
      <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-12">
      {day && day.tasks && day.tasks.length > 0 ? (
          day.tasks.map((task: ITask) => (
            <DailyTaskCard key={day.id} task={task} />
          ))
        ) : (
          <p>No tasks found.</p> // Display a message if there are no tasks
        )}
      </div>
    </div>
  );
};

export default DayView;
