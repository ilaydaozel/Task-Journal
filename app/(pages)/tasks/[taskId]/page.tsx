import getTaskById from '@/app/actions/getTaskById';
import EmptyState from '@/app/components/EmptyState';
import Task from '@/app/components/task/Task';


interface IParams {
  taskId?: string;
}

const TaskPage = async ({ params }: { params: IParams }) => {
  let task: ITask | null = null;
  try {
    task = await getTaskById(params);
    if (task) {
      return (
          <Task task={task}/>
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
