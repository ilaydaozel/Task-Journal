import prisma from "@/app/lib/prismadb";

interface IDateParams {
    date: Date; // Date object for the specific day
}

interface IDayDetails {
    day: IDay | null;
    week: IWeek | null;
}

export default async function getCurrentWeek(params: IDateParams): Promise<IDayDetails> {
    try {
        const { date } = params;
        // Ensure the date is a valid Date object
        if (!date || isNaN(date.getTime())) {
            throw new Error("Invalid date provided.");
        }

        // Retrieve the day based on the date
        const day = await prisma.day.findUnique({
            where: {
                date: date, // Match the date
            },
            include: {
                tasks: true, // Include tasks associated with the day
                week: true,
            },
        });

        // If the day is found, extract the related week, month, and year
        if (day) {
            const week = day.week; // Already included

            return {
                day: day as IDay,
                week: week as IWeek,
            };
        }

        // If no day is found, return nulls for all
        return {
            day: null,
            week: null,
        };
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
