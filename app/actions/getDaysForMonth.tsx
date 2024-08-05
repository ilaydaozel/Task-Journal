import prisma from "@/app/lib/prismadb";


export default async function getDaysForMonth({ year, month }: { year: number; month: number }): Promise<IDay[] | null> {
    try {
        const days = await prisma.day.findMany({
            where: {
                date: {
                    gte: new Date(year, month - 1, 1), // Start of the month
                    lt: new Date(year, month, 1), // Start of the next month
                },
            },
        });

        if (!days) {
            return null;
        }

        return days as IDay[]; // Ensure the return type matches IDay      
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
