import prisma from "@/app/lib/prismadb";

interface IDateParams {
    date: Date; // Date object for the specific day
}

export default async function getDayByDate(params: IDateParams): Promise<IDay | null> {
    try {
        const { date } = params;

        // Ensure the date is a valid Date object
        if (!date || isNaN(date.getTime())) {
            throw new Error("Invalid date provided.");
        }

        const day = await prisma.day.findUnique({
            where: {
                date: date.toISOString(), // Assuming the date field in the Day model is a DateTime
            },
            include: {
                tasks: true, // Include tasks associated with the day
                week: true,  // Include week associated with the day
            },
        });

        return day as unknown as IDay;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
