"use client";

import { useState } from "react";
import axios from "axios";
import { getStatusClassName, handleApiResponse } from "@/app/utils/helper";
import { useRouter } from "next/navigation";

const SideSection = ({ task }: { task: ITask }) => {
  const router = useRouter();
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    const updates: any = { id: task.id, fieldName: "status", fieldValue: newStatus };

    try {
      await handleApiResponse(
        axios.put(`/api/task/updateTask`, updates),
        router,
        "Status update successful"
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="md:w-2/5 w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
          <div className="mt-2 text-gray-700">
            <select
                value={status}
                onChange={handleStatusChange}
                className={`font-semibold p-2 rounded text-white ${getStatusClassName(task.status)}`}
                >
                <option value="to-do" className={`${getStatusClassName("to-do")}`}>To-Do</option>
                <option value="inProgress" className={`${getStatusClassName("inProgress")}`}>In Progress</option>
                <option value="done" className={`${getStatusClassName("done")}`}>Done</option>
            </select>
            {task?.deadlineAt &&  
            <div className="mt-2 text-gray-700">
              <strong>Deadline:{ new Date(task.deadlineAt).toDateString()}</strong> 
            </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSection;
