import getCurrentWeek from '@/app/actions/week/getCurrentWeek';
import getWeekById from '@/app/actions/week/getWeekById';
import EmptyState from '@/app/components/EmptyState';
import WeekView from '@/app/components/views/week/WeekView';


const WeekPage = async () => {
  try {
    const week = await getCurrentWeek()
    console.log("current week:", week.week);
  
    if (week.week) {
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <WeekView week={week.week}/>
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

export default WeekPage;
