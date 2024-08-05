"use client";

import { handleApiResponse } from "@/app/utils/Helper";
import EditableField from "../formComponents/EditableField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TrashIcon } from '@heroicons/react/24/outline'; // Import a delete icon

const CommentSection = ({ task }: { task: ITask }) => {
  const router = useRouter();
  const [comments, setComments] = useState(task.comments || []);

  const handleEditField = async (id: string, fieldName: string, fieldValue: any) => {
    try {
      await handleApiResponse(
        axios.put(`/api/task/updateTask`, { id, fieldName, fieldValue }),
        router,
        "Update successful"
      );
      console.log("Field updated successfully");
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  const handleAddComment = async (id: string, newComment: string) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments); // Update the local state for immediate UI update
    await handleEditField(id, "comments", updatedComments);
  };

  const handleUpdateComment = async (id: string, index: number, newComment: string) => {
    const updatedComments = [...comments];
    updatedComments[index] = newComment;
    setComments(updatedComments); // Update the local state for immediate UI update
    await handleEditField(id, "comments", updatedComments);
  };

  const handleDeleteComment = async (id: string, index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments); // Update the local state for immediate UI update
    await handleEditField(id, "comments", updatedComments);
  };

  return (
    <section className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div>
        <div className="mb-4 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
          <div className="h-20 rounded-md outline outline-2 outline-primary-600">
            <EditableField
                initialValue={"Write a comment.."}
                onSave={(newValue) => handleAddComment(task.id || "", newValue)}
            />
          </div>
          <ul className="mt-2 list-disc list-inside">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <li
                  key={index}
                  className="mt-1 text-gray-600 flex items-center"
                  style={{ listStyleType: "none" }}
                >
                  <EditableField
                    initialValue={comment}
                    onSave={(newValue) => handleUpdateComment(task.id || "", index, newValue)}
                  />
                  <TrashIcon
                    className="w-5 h-5 text-red-500 ml-2 cursor-pointer"
                    onClick={() => handleDeleteComment(task.id || "", index)}
                  />
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm" style={{ listStyleType: "none" }}>No comments yet.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
