import React from 'react';

const WeeklyTaskCard = ({ task }: { task: ITask }) => {
  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-sm mb-2">
      <h3 className="font-semibold">{task.name}</h3>
      <p className="text-gray-600">{task.description}</p>
      {/* Add any other task details you'd like to display */}
    </div>
  );
};

export default WeeklyTaskCard;
