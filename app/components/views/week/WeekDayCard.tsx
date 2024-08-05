import { getDayOfTheWeek, getMonthName } from '@/app/utils/Helper';
import React from 'react';
import WeeklyTaskCard from './WeeklyTaskCard';

const WeekDayCard = ({ day }: { day: IDay }) => {

  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-lg font-semibold border-b border-secondary-200">
      {getDayOfTheWeek(day.date.getDay())}, {day.date.getDate()} {getMonthName(day.date.getMonth())}
    </h2>
    <div className="mt-2 md:gap-6 grid md:grid-cols-2">
      {day.tasks.length > 0 && (
        day.tasks.map((task) => (
          <WeeklyTaskCard key={task.id} task={task} />
        ))
      ) }
    </div>
  </div>
  );
};

export default WeekDayCard;
