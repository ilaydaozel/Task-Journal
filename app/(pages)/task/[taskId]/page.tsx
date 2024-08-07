import getTaskById from '@/app/actions/task/getTaskById';
import EmptyState from '@/app/components/EmptyState';
import Task from '@/app/components/task/Task';
export const dynamic = 'force-dynamic';

interface IParams {
  taskId?: string;
}

const TaskPage = async ({ params }: { params: IParams }) => {
  let task: ITask | null = null;
  try {
    task = await getTaskById(params);
    if (task) {
      return (
        <div className='min-h-screen max-w-screen flex flex-col items-center justify-center'>
          <Task task={task}/>
        </div>
      );
    } else {
      return (
          <div className='bg-neutral-900'>
            <EmptyState item='artistAccount' />
          </div>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default TaskPage;
