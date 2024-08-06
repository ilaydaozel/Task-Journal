import prisma from "@/app/lib/prismadb";

interface IParams {
    date?: Date;
}

export default async function getCurrentDay({date}:IParams): Promise<IDay | null> {
    try {
        
        // Ensure the date is a valid Date object
        if (!date || isNaN(date.getTime())) {
            throw new Error("Invalid date provided.");
        }

        // Retrieve the day based on the date
        const day = await prisma.day.findUnique({
            where: {
                date: date.toISOString(), // Match the date
            },
            include: {
                tasks: true, // Include tasks associated with the day
                week: true,
            },
        });

        if(day) {
            return day as unknown as IDay
        }

        // If no day is found, return nulls for all
        return null
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
