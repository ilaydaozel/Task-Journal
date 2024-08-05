import getAllTasks from '@/app/actions/getAllTasks';
import TaskListPage from './TaskListPage';
export const dynamic = 'force-dynamic';


const TasksPage = async () => {
  try{
    const tasksData = await getAllTasks();
    if (tasksData){
      return (
        <div className='w-full flex flex-col items-center justify-center'>
          <TaskListPage tasks={tasksData}></TaskListPage>
        </div>
      );
    }


  }catch (error: any) {
    throw new Error(error);
  }

  
};

export default TasksPage;