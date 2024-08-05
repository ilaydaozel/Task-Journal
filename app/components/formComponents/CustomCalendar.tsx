"use client";
import { getMonthName } from '@/app/utils/helper';
import React, { useState } from 'react';

interface CustomCalendarProps {
  years: IYear[];
  allowMultipleSelection?: boolean; // New prop for enabling multiple day selection
  onDaySelect: (days: IDay[]) => void; // Prop to handle day selection
}

const CustomCalendar= ({ years, allowMultipleSelection = false, onDaySelect }: CustomCalendarProps) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(new Date().getFullYear()-2024);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [selectedDays, setSelectedDays] = useState<IDay[]>([]);

  const handleDaySelect = (day: IDay) => {
    if (allowMultipleSelection) {
        setSelectedDays((prevDays) => {
            const dayExists = prevDays.some((d) => d.date.toString() === day.date.toString());
            const updatedDays = dayExists
              ? prevDays.filter((d) => d.date.toString() !== day.date.toString())
              : [...prevDays, day];
            onDaySelect(updatedDays);
            return updatedDays;
          });
    } else {
            setSelectedDays([day]);
            onDaySelect([day]);
    }
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
      calendar.push(<div key={`empty-${i}`} className="w-6 h-6 border rounded-sm"></div>);
    }

    // Fill in the days of the month
    selectedMonth.weeks.forEach((week) => {
      week.days.forEach((day) => {
        const isSelected = selectedDays.some((d) => d.date.toString() == day.date.toString());
        calendar.push(
          <div
            key={day.date.toString()}
            className={`w-6 h-6 border flex items-center justify-center cursor-pointer 
                text-sm rounded-sm ${isSelected ? 'bg-white' : 'bg-primary-600'}`}
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
    <div className="flex flex-col min-w-10 gap-1 justify-center items-center p-3 bg-white rounded-lg shadow-md">
      {/* Year Selection */}
      <div className='w-fit'>
        <select
          onChange={handleYearChange}
          value={selectedYearIndex}
          className="bg-transparent text-md text-text1-400"
        >
          {years.map((year, index) => (
            <option key={year.yearNumber} value={index}>
              {year.yearNumber}
            </option>
          ))}
        </select>
      </div>
      {/* Month Navigation */}
      <div className="w-full flex justify-around mb-2">
        <button onClick={() => handleMonthChange('prev')} className="px-1 py-1 text-text1-500">
          &lt;
        </button>
        <div className="text-lg font-semibold text-center">
          {getMonthName(selectedMonth.monthNumber - 1)}
        </div>
        <button onClick={() => handleMonthChange('next')} className="px-1 py-1 text-text1-500">
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-xs">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
        {generateCalendar()}
      </div>
    </div>
  );
};

export default CustomCalendar;
