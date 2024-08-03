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
