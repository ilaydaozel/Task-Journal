import getAllTasks from '@/app/actions/getAllTasks';
import TaskListPage from './TaskListPage';
export const dynamic = 'force-dynamic';
import getDaysForMonth  from '@/app/actions/getDaysForMonth'; // Adjust the import path
import CustomCalendar from '@/app/components/formComponents/CustomCalendar';
import getAllYears from '@/app/actions/getAllYears';


const TasksPage = async () => {
  try{
    const tasksData = await getAllTasks();
    const years = await getAllYears();
    if (years){
      return (
        <div className='w-full flex flex-col items-center justify-center'>
          <TaskListPage tasks={tasksData}></TaskListPage>
          <CustomCalendar years={years} />
        </div>
      );
    }


  }catch (error: any) {
    throw new Error(error);
  }

  
};

export default TasksPage;