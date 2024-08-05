"use client";
import { getMonthName } from '@/app/utils/Helper';
import React, { useEffect, useState } from 'react';

interface CustomCalendarProps {
  years: IYear[]
}


const CustomCalendar: React.FC<CustomCalendarProps> = ({ years }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<IDay | null>(null);

  const handleDaySelect = (day: IDay) => {
      setSelectedDay(day);
      console.log('Selected Day:', day);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYearIndex(Number(event.target.value));
      setSelectedMonthIndex(0);
  };

  const handleMonthChange = (direction: 'next' | 'prev') => {
      const maxMonths = years[selectedYearIndex].months.length;
      if (direction === 'next') {
          setSelectedMonthIndex((prev) => (prev + 1) % maxMonths);
      } else {
          setSelectedMonthIndex((prev) => (prev - 1 + maxMonths) % maxMonths);
      }
  };

  const selectedYear = years[selectedYearIndex];
  const selectedMonth = selectedYear.months[selectedMonthIndex];

  const generateCalendar = () => {
      const calendar: JSX.Element[] = [];
      
      // Get the first day of the month
      const firstDayOfMonth = new Date(selectedYear.yearNumber, selectedMonth.monthNumber - 1, 1);
      const firstDay = (firstDayOfMonth.getDay() + 6) % 7; // Convert Sunday (0) to 6, making Monday (1) the first day

      // Fill the first week with empty slots
      for (let i = 0; i < firstDay; i++) {
          calendar.push(<div key={`empty-${i}`} className="w-10 h-10 border"></div>);
      }

      // Fill in the days of the month
      selectedMonth.weeks.forEach((week) => {
          week.days.forEach((day) => {
              calendar.push(
                  <div
                      key={day.date.toString()}
                      className={`w-10 h-10 border flex items-center justify-center cursor-pointer 
                          text-sm ${selectedDay?.date.toString() === day.date.toString() ? 'bg-blue-200' : 'bg-white'}`}
                      onClick={() => handleDaySelect(day)}
                  >
                      {day.date.getDate()}
                  </div>
              );
          });
      });

      return calendar;
  };

  return (
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
          {/* Year Selection */}
          <select
              onChange={handleYearChange}
              value={selectedYearIndex}
              className="mb-2 p-2 border border-gray-300 rounded"
          >
              {years.map((year, index) => (
                  <option key={year.yearNumber} value={index}>
                      {year.yearNumber}
                  </option>
              ))}
          </select>

          {/* Month Navigation */}
          <div className="flex justify-between mb-4">
              <button onClick={() => handleMonthChange('prev')} className="px-2 py-1 bg-blue-500 text-white rounded">
                  &lt; Prev
              </button>
              <div className="text-lg font-bold text-center">
                  {getMonthName(selectedMonth.monthNumber - 1)}
              </div>
              <button onClick={() => handleMonthChange('next')} className="px-2 py-1 bg-blue-500 text-white rounded">
                  Next &gt;
              </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
              {generateCalendar()}
          </div>
      </div>
  );
};

export default CustomCalendar;