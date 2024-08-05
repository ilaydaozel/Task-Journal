import getCurrentDay from '@/app/actions/day/getCurrentDay';
import getDayByDate from '@/app/actions/day/getDayByDate';
import getCurrentWeek from '@/app/actions/week/getCurrentWeek';
import getWeekById from '@/app/actions/week/getWeekById';
import EmptyState from '@/app/components/EmptyState';
import WeekView from '@/app/components/views/week/WeekView';
export const dynamic = 'force-dynamic';


const WeekPage = async () => {
  try {
    const week = await getCurrentWeek();
    console.log("current week:", week);
  
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <WeekView week={week}/>
        </div>
      );
  
  } catch (error: any) {
    throw new Error(error);
  }
};

export default WeekPage;
