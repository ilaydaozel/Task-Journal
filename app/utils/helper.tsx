import { toast } from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleApiResponse = async (
  submitResponse: Promise<AxiosResponse<any, any>>,
  router: AppRouterInstance,
  successMessage: string,
  onSuccess?: () => void,
  setIsLoading?: (isLoading: boolean) => void,
) => {
  if(setIsLoading){
    setIsLoading(true);
  }
  console.log(submitResponse);
  try {
    submitResponse.then((response: AxiosResponse<any, any>) => {
      console.log("response", response)
      if (response.data?.error) {
        toast.error(response.data.error);
      } else {
        toast.success(successMessage);
        if (onSuccess) {
          onSuccess();
        }
        router.refresh();
        console.log("page refreshed")
      }
    });
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        :'unknownError' 
    );
  } finally {
    if(setIsLoading){
      setIsLoading(false);
    }
  }
};

export const getWeekNumber = (d: Date): [number, number, number] => {
  // Copy date so we don't modify the original
  let date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  
  // Get the first day of the year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  
  // Calculate full weeks to the nearest Thursday
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  
  // Get the current month
  const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1

  // Return an array of year, week number, and month
  return [date.getUTCFullYear(), weekNo, month];
};


export const getMonthNumber = (d: Date): number => {
  return d.getMonth() + 1; // Months are zero-based in JavaScript, so add 1
};

// Function to get the month name based on the month index (0-11)
export const getMonthName = (month: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month] || 'Invalid Month'; // Return the month name or default
  };

  // Function to get the month name based on the month index (0-11)
export const getMonthNameAbbreviated = (month: number) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return monthNames[month] || 'Invalid Month'; // Return the month name or default
};


  // Function to get the day of the week based on the day index (0-6)
export  const getDayOfTheWeek = (dayNumber: number) => {
    const dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    return dayNames[dayNumber] || 'Invalid Day'; // Return the day name or default
  };


export const printNumericDateDMY = (date: Date | undefined) => {
  if(date instanceof Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (day<10?"0"+day:day)+"."+(month<10?"0"+month:month)+"."+year;
  }else{
    return "none"
  }
};

export const printNumericDateDM = (date: Date | undefined) => {
  if(date instanceof Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1;
    return (day<10?"0"+day:day)+"."+(month<10?"0"+month:month);
  }else{
    return "none"
  }
};

export const printStringDateDM = (date: Date | undefined) => {
  if(date instanceof Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1;
    return (day<10?"0"+day:day)+" "+getMonthNameAbbreviated(month);
  }else{
    return "none"
  }
};

export const printStringDateDMYD = (date: Date | undefined) => {
  if(date instanceof Date) {
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (day<10?"0"+day:day)+" "+getMonthNameAbbreviated(month)+" "+year+", "+ getDayOfTheWeek(date.getDay());
  }else{
    return "none"
  }
};

export const getStatusClassName = (status: string | null) => {
  switch (status) {
    case 'to-do':
      return 'bg-todo';
    case 'inProgress':
      return 'bg-inProgress';
    case 'done':
      return 'bg-done';
    default:
      return 'bg-white';
  }
};