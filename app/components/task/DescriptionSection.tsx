"use client";

import { useRouter } from "next/navigation";
import EditableField from "../formComponents/EditableField";
import { useState } from "react";
import { handleApiResponse } from "@/app/utils/helper";
import axios from "axios";

const DescriptionSection = ({ task }: { task: ITask }) => {
  const router = useRouter();
  const [description, setDescription] = useState(task?.description || "No description available." );

  const handleEditField = async (id: string, fieldName: string, fieldValue: any) => {
    try {
      await handleApiResponse(
        axios.put(`/api/task/updateTask`, { id, fieldName, fieldValue }),
        router,
        "Description update successful"
      );
      console.log("Field updated successfully");
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };
  const handleUpdateDescription = async (id: string, newDescription: string) => {
    setDescription(newDescription); // Update the local state for immediate UI update
    await handleEditField(id, "description", newDescription);
  };

  return (
    <section className="md:w-4/5 w-full mx-auto pt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-text1-600 mb-4">{task?.name}</h1>
      <div className="mb-4">
            <div className="mt-2 py-10 text-gray-700">
              <EditableField
                  initialValue={task?.description || "No description available."}
                  onSave={(newValue) => handleUpdateDescription(task.id || "", newValue)}
                  isEditableWhenClicked = {true}
              />
            </div>
      </div>
    </section>
  );
};


export default DescriptionSection;
