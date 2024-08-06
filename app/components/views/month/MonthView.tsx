"use client";

import { getMonthName } from "@/app/utils/helper";

const MonthView = ({ month}: { month: IMonth | null }) => {
  console.log("month:", month)
  return (
    <div id="taskListComponent" className="w-full min-h-screen flex flex-col gap-4 items-center mx-auto p-10 md:px-24 md:py-10 bg-primary">
      <h1 className='md:text-2xl text-lg font-bold text-text1-700 px-4 py-2 font-serif'>{getMonthName(month && (month?.monthNumber-1 )|| 0)}</h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
      <p>To be implemented.</p>
      </div>
    </div>
  );
};

export default MonthView;
