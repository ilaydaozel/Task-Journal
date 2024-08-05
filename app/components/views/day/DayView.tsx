"use client";

import DailyTaskCard from './DailyTaskCard';

const DayView = ({ day}: { day?: IDay }) => {

  return (
    <div id="taskListComponent" className="container mx-auto p-10 md:px-24 md:py-10 bg-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
