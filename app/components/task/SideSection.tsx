"use client";

const SideSection = ({ task }: { task: ITask }) => {
  return (
    <div className="md:w-2/5 w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <div className="mt-2 text-gray-700">
              <strong>Acceptance Criteria:</strong> {task?.acceptanceCriteria || "No acceptance criteria provided."}
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Start Date:</strong> {task?.startedAt ? new Date(task.startedAt).toDateString() : "No start date set."}
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Completed At:</strong> {task?.completedAt ? new Date(task.completedAt).toDateString() : "Not completed yet."}
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Deadline:</strong> {task?.deadlineAt ? new Date(task.deadlineAt).toDateString() : "No deadline set."}
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Status:</strong> <span className={`font-semibold ${task?.status === "done" ? "text-green-500" : task?.status === "in progress" ? "text-yellow-500" : "text-red-500"}`}>{task?.status}</span>
            </div>
            
          </div>
        </div>
       
      </div>
    </div>
  );
};


export default SideSection;
