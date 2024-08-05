import getCurrentDay from '@/app/actions/day/getCurrentDay';
import getCurrentWeek from '@/app/actions/week/getCurrentWeek';
import getWeekById from '@/app/actions/week/getWeekById';
import EmptyState from '@/app/components/EmptyState';
import WeekView from '@/app/components/views/week/WeekView';


const WeekPage = async () => {
  try {
    const day = await getCurrentDay()
    const week = await getWeekById({ weekId: day?.weekId });
    console.log("current week:", week);
  
    if (week) {
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <WeekView week={week}/>
        </div>
      );
    } else {
      return (
        <EmptyState item={'week'}></EmptyState>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default WeekPage;
