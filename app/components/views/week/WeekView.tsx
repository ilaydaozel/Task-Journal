"use client";

import WeekDayCard from './WeekDayCard';

const WeekView = ({ week}: { week?: IWeek }) => {

  return (
    <div id="taskListComponent" className="container mx-auto p-10 md:px-24 md:py-10 bg-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
