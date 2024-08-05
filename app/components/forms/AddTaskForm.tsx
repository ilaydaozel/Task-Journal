"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
  const [selectedWorkedOnDays, setSelectedWorkedOnDays] = useState<IDay[]>([]); // State for worked on days
  const router = useRouter();
  // Check if the element exists before setting the app element
  useEffect(() => {
    const appElement = document.getElementById('navbar');
    if (appElement) {
      Modal.setAppElement('#navbar');
    }
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkedOnDaysSelect = (days: IDay[]) => {
    setSelectedWorkedOnDays(days);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = axios.post('/api/task/createTask', {
        ...formData,
        deadlineAt: formData.deadlineAt ? new Date(formData.deadlineAt) : null,
        workedOnDays: selectedWorkedOnDays,
      });
      await handleApiResponse(response, router, "Add successful");
      setSelectedWorkedOnDays([]);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding task:', error);
      const errorMessage = (error as Error).message; // Cast 'error' to 'Error' type
      alert('An error occurred while adding the task: ' + errorMessage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-white bg-opacity-50"
    >
      <div className="bg-white w-full max-w-2xl mx-auto p-6 border border-solid border-gray-200 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
        <div className='flex flex-col items-center p-4'>
          <h2 className='text-lg font-bold mb-4'>Add New Task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className='flex flex-col md:flex-row gap-4 w-full'>
              <div className='flex flex-col gap-4 w-full'>
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
              <div className='flex flex-col gap-4 w-full'>
                <label className='text-sm font-semibold'>Assign Day</label>
                <CustomCalendar 
                  years={years} 
                  allowMultipleSelection={true} 
                  onDaySelect={handleWorkedOnDaysSelect} 
                />
              </div>
            </div>
            <div className='flex gap-4 items-center justify-end'>
              <Button type="submit" label='Add Task'/>
              <Button type="button" onClick={onClose} label='Cancel'/>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTaskForm;
