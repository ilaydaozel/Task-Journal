"use client";
import { getMonthName } from '@/app/utils/Helper';
import React, { useEffect, useState } from 'react';

interface CustomCalendarProps {
  years: IYear[]
}


const CustomCalendar: React.FC<CustomCalendarProps> = ({ years }) => {
   const [selectedYearIndex, setSelectedYearIndex] = useState(0);
   const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
   const [selectedDays, setSelectedDays] = useState<IDay[]>([]);

   const handleDaySelect = (day: IDay) => {
        setSelectedDays((prevSelectedDays) => {
        const isSelected = prevSelectedDays.some(
            (selectedDay) => selectedDay.date.toString() === day.date.toString()
        );
        if (isSelected) {
            return prevSelectedDays.filter(
            (selectedDay) => selectedDay.date.toString() !== day.date.toString()
            );
        } else {
            return [...prevSelectedDays, day];
        }
        });
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
          calendar.push(<div key={`empty-${i}`} className="w-6 h-6 border"></div>);
      }

     // Fill in the days of the month
     selectedMonth.weeks.forEach((week) => {
        week.days.forEach((day) => {
          const isSelected = selectedDays.some(
            (selectedDay) => selectedDay.date.toString() === day.date.toString()
          );
          calendar.push(
            <div
              key={day.date.toString()}
              className={`w-6 h-6 border flex items-center justify-center cursor-pointer text-sm ${
                isSelected ? 'bg-white' : 'bg-primary-200'
              }`}
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
      <div className="flex flex-col gap-1 justify-center items-center p-3 bg-gray-50 rounded-lg shadow-md">
          {/* Year Selection */}
          <div className='w-fit'>
            <select
                onChange={handleYearChange}
                value={selectedYearIndex}
                className="bg-transparent text-text1-600"
            >
                {years.map((year, index) => (
                    <option key={year.yearNumber} value={index}>
                        {year.yearNumber}
                    </option>
                ))}
            </select>
          </div>
          {/* Month Navigation */}
          <div className="w-full relative flex justify-around mb-2">
              <button onClick={() => handleMonthChange('prev')} className="absolute left-1 py-1 text-text1-500">
                  &lt;
              </button>
              <div className="text-lg text-text1-700 font-semibold text-center">
                  {getMonthName(selectedMonth.monthNumber - 1)}
              </div>
              <button onClick={() => handleMonthChange('next')} className="absolute right-1 py-1 text-text1-500">
                  &gt;
              </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 text-xs text-text1-600">
              <text>M</text>
              <text>T</text>
              <text>W</text>
              <text>T</text>
              <text>F</text>
              <text>S</text>
              <text>S</text>
              {generateCalendar()}
          </div>
      </div>
  );
};

export default CustomCalendar;