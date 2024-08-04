"use client";
import { getMonthName } from '@/app/utils/Helper';
import React, { useEffect, useState } from 'react';

interface CustomCalendarProps {
  days: IDay[]
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ days }) => {

  // Generate an array representing the days of the month
  const generateCalendar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedDay, setSelectedDay] = useState<IDay | null>(null);

    const daysInMonth = new Date(days[14].date.getFullYear(), days[0].date.getMonth(), 0).getDate(); // Get the total number of days in the month
    const firstDayOfMonth = new Date(days[14].date.getFullYear(), days[0].date.getMonth() - 1, 1).getDay(); // Get the first day of the month (0-6, 0 = Sunday)

    const handleDaySelect = (day: IDay) => {
        setSelectedDay(day);
        console.log('Selected Day:', day); // Handle the selected day (e.g., open a task modal)
        };
    const calendar = [];
    let dayCount = 1;

    // Fill the first week with empty slots
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendar.push(<div key={`empty-${i}`} className="w-6 h-6 border"></div>);
    }

    // Fill in the days of the month
    for (let i = firstDayOfMonth; dayCount <= daysInMonth; i++) {
        const day = days && days.find(d => new Date(d.date).getDate() === dayCount);
        calendar.push(
        <div
            key={dayCount}
            className={`w-6 h-6 border flex items-center justify-center cursor-pointer 
               text-xs ${
            day ? 'bg-primary-100' : 'bg-white'
            }`}
            onClick={() => day && handleDaySelect(day)} // Call the callback with the day object
        >
            {dayCount}
        </div>
        );
        dayCount++;
    }

    return calendar;
  };

  return (
    <div className='flex flex-col'>
        <div className='text-md text-text1-700'>{getMonthName(days[14].date.getMonth())}</div>
        <div className="grid grid-cols-7">
            {generateCalendar()}
        </div>
    </div>

  );
};

export default CustomCalendar;