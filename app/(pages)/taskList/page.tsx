import getAllTasks from '@/app/actions/getAllTasks';
import TaskListPage from './TaskListPage';
export const dynamic = 'force-dynamic';
import getDaysForMonth  from '@/app/actions/getDaysForMonth'; // Adjust the import path
<<<<<<< Updated upstream
import CustomCalendar from '@/app/components/CustomCalendar';
=======
import CustomCalendar from '@/app/components/formComponents/CustomCalendar';
>>>>>>> Stashed changes

const TasksPage = async () => {
  try{
    const tasksData = await getAllTasks();

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // Months are 0-indexed
    const daysInMonth = await getDaysForMonth({ year, month });
    if (daysInMonth){
      return (
        <div className='w-full flex flex-col items-center justify-center'>
          <h1>Welcome to Task-Journal</h1>
          <TaskListPage tasks={tasksData}></TaskListPage>
          <CustomCalendar days={daysInMonth} />
<<<<<<< Updated upstream
  
=======
>>>>>>> Stashed changes
        </div>
      );
    }


  }catch (error: any) {
    throw new Error(error);
  }

  
};

export default TasksPage;