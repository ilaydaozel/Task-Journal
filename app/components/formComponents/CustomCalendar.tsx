"use client";
import { getMonthName } from '@/app/utils/Helper';
import React, { useEffect, useState } from 'react';

interface CustomCalendarProps {
  years: IYear[]
}


const CustomCalendar: React.FC<CustomCalendarProps> = ({ years }) => {
  const [selectedDay, setSelectedDay] = useState<IDay | null>(null);

  const handleDaySelect = (day: IDay) => {
      setSelectedDay(day);
      console.log('Selected Day:', day); // Handle the selected day (e.g., open a task modal)
  };

  return (
      <div className="flex flex-col">
          {years.map(year => (
              <div key={year.id} className="mb-6">
                  <h2 className="text-xl font-bold">{year.yearNumber}</h2>
                  {year.months.map(month => (
                      <div key={month.monthNumber} className="mb-4">
                          <h3 className="text-lg">{getMonthName(month.monthNumber - 1)}</h3>
                          {month.weeks.map((week, weekIndex) => (
                              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                                  {week.days.map((day) => (
                                      <div
                                          key={day.date.toString()}
                                          className={`w-6 h-6 border flex items-center justify-center cursor-pointer 
                                              text-xs ${selectedDay?.date.toDateString() === day.date.toDateString() ? 'bg-blue-300' : 'bg-white'}`}
                                          onClick={() => handleDaySelect(day)}
                                      >
                                          {new Date(day.date).getDate()}
                                      </div>
                                  ))}
                                  {/* Fill empty slots for days not in this week */}
                                  {Array.from({ length: 7 - week.days.length }, (_, index) => (
                                      <div key={`empty-${index}`} className="w-6 h-6 border"></div>
                                  ))}
                              </div>
                          ))}
                      </div>
                  ))}
              </div>
          ))}
      </div>
  );
};

export default CustomCalendar;