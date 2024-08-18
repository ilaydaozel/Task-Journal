import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../formComponents/Button';
import { handleApiResponse, printStringDateDM } from '@/app/utils/helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '../formComponents/InputField';
import CustomCalendar from '../formComponents/CustomCalendar';
import SelectField from '../formComponents/SelectField'; // A hypothetical select field component
import TagSelectField from '../formComponents/TagSelectField';

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  years: IYear[];
  tags: ITag[];
}

const AddTaskForm = ({ isOpen, onClose, years, tags}: AddTaskFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'TASK', // Default task type
    tags: [] as string[], // Update to handle tag IDs
    parentTaskId: '',
  });
  const [selectedWorkedOnDays, setSelectedWorkedOnDays] = useState<IDay[]>([]);
  const [timeslots, setTimeslots] = useState<ITimeSlot[]>([]);
  const router = useRouter();
  const [availableTasks, setAvailableTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const appElement = document.getElementById('navbar');
    if (appElement) {
      Modal.setAppElement('#navbar');
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkedOnDaysSelect = (days: IDay[]) => {
    setSelectedWorkedOnDays(days);
  };

  const handleTimeslotChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const newTimeslots = [...timeslots];
    newTimeslots[index] = {
      ...newTimeslots[index],
      [field]: new Date(value),
    };
    setTimeslots(newTimeslots);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = axios.post('/api/task/createTask', {
        ...formData,
        workedOnDays: selectedWorkedOnDays,
        timeslots,
      });
      await handleApiResponse(response, router, "Add successful");
      setSelectedWorkedOnDays([]);
      setTimeslots([]);
      setFormData({
        name: '',
        description: '',
        type: 'TASK',
        tags: [],
        parentTaskId: '',
      });
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
      const errorMessage = (error as Error).message;
      alert('An error occurred while adding the task: ' + errorMessage);
    }
  };

  const handleTagChange = (selectedTagIds: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: selectedTagIds,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={`${isOpen? "block" : "hidden"} fixed inset-0 flex items-center justify-center p-4 z-50`}
      overlayClassName={`${isOpen? "block" : "hidden"} fixed inset-0 bg-white bg-opacity-50`}
    >
      <div className={`${isOpen? "block" : "hidden"} bg-white w-full max-w-2xl mx-auto p-6 border border-solid border-gray-200 rounded-lg shadow-md max-h-[80vh] overflow-y-auto text-text1-800`}>
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
                  type='textarea'
                />
                <TagSelectField
                  label="Tags"
                  name="tags"
                  value={formData.tags}
                  options={tags.map(tag => ({ value: tag.id? tag.id: '', label: tag.name }))}
                  onChange={handleTagChange}
                />
                <SelectField
                  label="Task Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={[
                    { value: 'TASK', label: 'Task' },
                    { value: 'NOTE', label: 'Note' },
                    { value: 'MEETING', label: 'Meeting' },
                    { value: 'HABIT_TRACKER', label: 'Habit Tracker' },
                  ]}
                />
                <SelectField
                  label="Parent Task"
                  name="parentTaskId"
                  value={formData.parentTaskId ? formData.parentTaskId : ''}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'None' },
                    ...availableTasks.map(task => ({ value: task.id? task.id : '', label: task.name })),
                  ]}
                />
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <label className='text-sm font-semibold'>Assign Day</label>
                <CustomCalendar 
                  years={years} 
                  allowMultipleSelection={true} 
                  onDaySelect={handleWorkedOnDaysSelect} 
                />
                {selectedWorkedOnDays && selectedWorkedOnDays.map((day, index) => (
                  <div key={index} className='flex flex-col gap-2'>
                    <label>Timeslot for {printStringDateDM(day.date)}</label>
                    <InputField
                      name={`timeslot-start-${index}`}
                      label="Start Time"
                      type="datetime-local"
                      value={timeslots[index]?.startTime.toISOString().slice(0, 16) || ''}
                      onChange={(e) => handleTimeslotChange(index, 'startTime', e.target.value)}
                    />
                    <InputField
                      name={`timeslot-end-${index}`}
                      label="End Time"
                      type="datetime-local"
                      value={timeslots[index]?.endTime.toISOString().slice(0, 16) || ''}
                      onChange={(e) => handleTimeslotChange(index, 'endTime', e.target.value)}
                    />
                  </div>
                ))}
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
