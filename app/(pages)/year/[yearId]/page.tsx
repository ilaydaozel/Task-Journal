import getYearById from '@/app/actions/year/getYearById';
import YearView from '@/app/components/views/year/YearView';
export const dynamic = 'force-dynamic';

interface IParams {
  yearId?: string;
}

const YearPage = async ({ params }: { params: IParams }) => {
  let year: IYear | null = null;
  try {
    year = await getYearById(params);
  
      return (
        <div className='min-h-screen max-w-screen mt-16 flex flex-col items-center'>
          <YearView year={year}/>
        </div>
      );
  
  } catch (error: any) {
    throw new Error(error);
  }
};

export default YearPage;
