import getDayById from '@/app/actions/day/getDayById';
import EmptyState from '@/app/components/EmptyState';
import DayView from '@/app/components/views/day/DayView';

interface IParams {
  dayId?: string;
}

const DayPage = async ({ params }: { params: IParams }) => {
  let day: IDay | null = null;
  try {
    day = await getDayById({dayId: params.dayId});
  
    if (day) {
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <DayView day={day}/>
        </div>
      );
    } else {
      return (
          <div className='bg-neutral-900'>
            <EmptyState item='task' />
          </div>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default DayPage;
