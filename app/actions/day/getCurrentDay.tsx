import prisma from "@/app/lib/prismadb";


export default async function getCurrentDay(): Promise<IDay | null> {
    try {
        const today = new Date()
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
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

        if(day) {
            return day as unknown as IDay
        }

        // If no day is found, return nulls for all
        return null
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
