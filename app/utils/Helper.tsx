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
