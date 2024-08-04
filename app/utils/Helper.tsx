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

export const getWeekNumber = (d: Date): [number, number] => {
  // Copy date so we don't modify the original
  let date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  
  // Get the first day of the year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  
  // Calculate full weeks to the nearest Thursday
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  
  // Return an array of year and week number
  return [date.getUTCFullYear(), weekNo];
};

  // Function to get the month name based on the month index (0-11)
export const getMonthName = (month: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
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
