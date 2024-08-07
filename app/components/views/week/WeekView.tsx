"use client";

import { printStringDateDM } from '@/app/utils/helper';
import WeekDayCard from './WeekDayCard';

const WeekView = ({ week}: { week: IWeek | null }) => {
  console.log("week:", week)
  return (
    <div id="taskListComponent" className="w-full min-h-screen flex flex-col gap-4 items-center mx-auto p-10 md:px-24 md:py-10 bg-primary">
      <h1 className='md:text-2xl text-lg font-bold text-text1-700 px-4 py-2 font-serif'>{printStringDateDM(week?.days[0].date) + " - " + printStringDateDM(week?.days[week.days.length-1].date)}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
      {week && week.days && week.days.length > 0 ? (
          week.days.map((day) => (
            <WeekDayCard key={day.id} day={day} />
          ))
        ) : (
          <p>No tasks found.</p> // Display a message if there are no tasks
        )}
      </div>
    </div>
  );
};

export default WeekView;
