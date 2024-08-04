import { getDayOfTheWeek, getMonthName } from '@/app/utils/Helper';
import React from 'react';
import WeeklyTaskCard from './WeeklyTaskCard';

const WeekDayCard = ({ day }: { day: IDay }) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-lg font-semibold">
      {getDayOfTheWeek(day.date.getDay())}, {day.date.getDate()} {getMonthName(day.date.getMonth())}
    </h2>
    <div className="mt-2">
      {day.tasks.length > 0 ? (
        day.tasks.map((task) => (
          <WeeklyTaskCard key={task.id} task={task} />
        ))
      ) : (
        <p className="text-gray-600">No tasks assigned</p>
      )}
    </div>
  </div>
  );
};

export default WeekDayCard;
