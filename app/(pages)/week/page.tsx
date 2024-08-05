import getCurrentWeek from '@/app/actions/week/getCurrentWeek';
import EmptyState from '@/app/components/EmptyState';
import WeekView from '@/app/components/views/week/WeekView';


const WeekPage = async () => {
  try {
    const week = await getCurrentWeek()
    console.log("current week:", week);
  
    if (week) {
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <WeekView week={week}/>
        </div>
      );
    } else {
      return (
        <div>
          <h1> week: </h1>
          <div>{week}</div>
        </div>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default WeekPage;
