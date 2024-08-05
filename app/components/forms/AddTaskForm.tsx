"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import Button from '../formComponents/Button';
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '../formComponents/InputField';
import CustomCalendar from '../formComponents/CustomCalendar'; // Adjust the import path if necessary

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  years: IYear[]; // Add years prop to pass to CustomCalendar
}

const AddTaskForm = ({ isOpen, onClose, years }: AddTaskFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    acceptanceCriteria: '',
    deadlineAt: '',
  });
  const [selectedWorkedOnDayIds, setSelectedWorkedOnDayIds] = useState<string[]>([]); // State for worked on days
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkedOnDayIdsSelect = (dayIds: string[]) => {
    setSelectedWorkedOnDayIds(dayIds);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = axios.post('/api/task/createTask', {
        ...formData,
        deadlineAt: formData.deadlineAt ? new Date(formData.deadlineAt) : null,
        workedOnDayIds: selectedWorkedOnDayIds,
      });
      await handleApiResponse(response, router, "Add successful");
      setSelectedWorkedOnDayIds([]);
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
                label="Deadline"
                name="deadlineAt"
                value={formData.deadlineAt}
                onChange={handleChange}
                type="date"
              />
            </div>
            <div className='flex flex-col gap-4'>
              <label className='text-sm font-semibold'>Select Days</label>
              <CustomCalendar 
                years={years} 
                allowMultipleSelection={true} 
                onDaySelect={handleWorkedOnDayIdsSelect} 
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
