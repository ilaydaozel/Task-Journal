"use client";

import { handleApiResponse } from "@/app/utils/Helper";
import EditableField from "../formComponents/EditableField";
import axios from "axios";
import { useRouter } from "next/navigation";

const Task = ({ task }: { task: ITask }) => {
  const router = useRouter();
  const handleEditField = async (id: string, fieldName: string, fieldValue: any) => {
    try {
      await handleApiResponse(
        axios.put(
          `/api/task/updateTask`,
          { id, fieldName, fieldValue }
        ),
        router,
        "Update successful"
      );
      console.log('Field updated successfully');
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  return (
    <div className="w-4/5 mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{task?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Details</h2>
            <div className="mt-2 text-gray-700">
              <strong>Description:</strong> {task?.description || "No description available."}
            </div>
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
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
            <ul className="mt-2 list-disc list-inside">
              {task?.comments && task.comments.length > 0 ? (
                task.comments.map((comment, index) => (
                  <li key={index} className="mt-1 text-gray-600">
                    <EditableField initialValue={comment} onSave={(newValue) => handleEditField(task.id || "", "comments", [newValue])} />
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No comments yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Task;
