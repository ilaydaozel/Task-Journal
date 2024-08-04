"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../formComponents/Button';
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '../formComponents/InputField';


interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskForm = ({ isOpen, onClose }: AddTaskFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    acceptanceCriteria: '',
    startedAt: '',
    completedAt: '',
    deadlineAt: '',
    status: '',
    comments: '',
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = axios.post('/api/task/createTask', {
        ...formData,
        startedAt: new Date(formData.startedAt),
        completedAt: new Date(formData.completedAt),
        deadlineAt: new Date(formData.deadlineAt),
        comments: formData.comments.split(',').map((comment: string) => comment.trim()),
      });
      await handleApiResponse(response, router, "Add successful");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding task:', error);
      const errorMessage = (error as Error).message; // Cast 'error' to 'Error' type
      alert('An error occurred while adding the task: ' + errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="w-fit fixed overflow-y-auto overflow-x-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200 rounded-lg shadow-md p-6">
      <div className='flex flex-col items-center p-4'>
        <h2 className='text-lg font-bold mb-4'>Add New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className='flex gap-4'>
            <div className='flex flex-col gap-4'>
              <InputField 
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField 
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <InputField 
                label="Acceptance Criteria"
                name="acceptanceCriteria"
                value={formData.acceptanceCriteria}
                onChange={handleChange}
              />
              <InputField 
                label="Start Date"
                name="startedAt"
                value={formData.startedAt}
                onChange={handleChange}
                required
                type="date"
              />
              <InputField 
                label="Completed At"
                name="completedAt"
                value={formData.completedAt}
                onChange={handleChange}
                required
                type="date"
              />
              <InputField 
                label="Deadline"
                name="deadlineAt"
                value={formData.deadlineAt}
                onChange={handleChange}
                required
                type="date"
              />
            </div>
            <div className='flex flex-col gap-4'>
              <InputField 
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
              <InputField 
                label="Comments (comma-separated)"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex gap-4 items-center justify-end'>
            <Button type="submit" label='Add Task'/>
            <Button type="button" onClick={onClose} label='Cancel'/>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskForm;
