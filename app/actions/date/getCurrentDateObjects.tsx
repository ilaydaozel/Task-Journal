import prisma from "@/app/lib/prismadb";

interface IDateParams {
    date: Date; // Date object for the specific day
}


export default async function getCurrentDateObjects(params: IDateParams): Promise<IDayDetails> {
    try {
        const { date } = params;
        
        // Retrieve the day based on the date
        const day = await prisma.day.findUnique({
            where: {
                date: date.toISOString(), // Match the date
            },
            include: {
                tasks: true, // Include tasks associated with the day
                week: {
                    include: {
                        month: {
                            include: {
                                year: true, // Include year associated with the month
                            },
                        },
                    },
                },
            },
        });

        // If the day is found, extract the related week, month, and year
        if (day) {
            const week = day.week; // Already included
            const month = week?.month; // Get the month from the week
            const year = month?.year; // Get the year from the month

            return {
                day: day as IDay,
                week: week as IWeek,
                month: month as IMonth,
                year: year as IYear,
            };
        }

        // If no day is found, return nulls for all
        return {
            day: null,
            week: null,
            month: null,
            year: null,
        };
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
