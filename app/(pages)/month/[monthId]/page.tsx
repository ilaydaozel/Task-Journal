import getMonthById from '@/app/actions/month/getMonthById';
import MonthView from '@/app/components/views/month/MonthView';
export const dynamic = 'force-dynamic';

interface IParams {
  monthId?: string;
}

const MonthPage = async ({ params }: { params: IParams }) => {
  let month: IMonth | null = null;
  try {
    month = await getMonthById(params);
  
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <MonthView month={month}/>
        </div>
      );
  
  } catch (error: any) {
    throw new Error(error);
  }
};

export default MonthPage;
