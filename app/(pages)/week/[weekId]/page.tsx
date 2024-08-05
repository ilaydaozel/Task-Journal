import getWeekByWeekId from '@/app/actions/week/getWeekByWeekId';
import EmptyState from '@/app/components/EmptyState';
import WeekView from '@/app/components/views/week/WeekView';

interface IParams {
  weekId?: string;
}

const WeekPage = async ({ params }: { params: IParams }) => {
  let week: IWeek | null = null;
  try {
    week = await getWeekByWeekId({weekId: params.weekId});
    console.log("current week:", week);
  
    if (week) {
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <WeekView week={week}/>
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
