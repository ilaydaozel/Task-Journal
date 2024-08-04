import getAllTasks from '@/app/actions/getTasks';
import TaskListPage from './TaskListPage';
export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers'

const TasksPage = async () => {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  console.log("theme", theme)
  try{
    const tasksData = await getAllTasks();
    return (
      <div className='w-full flex flex-col items-center justify-center '>
        <h1>Welcome to Task-Journal</h1>
        <TaskListPage tasks={tasksData}></TaskListPage>
      </div>
    );
  }catch (error: any) {
    throw new Error(error);
  }

  
};

export default TasksPage;