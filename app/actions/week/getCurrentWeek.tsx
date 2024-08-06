import prisma from "@/app/lib/prismadb";


export default async function getCurrentWeek(): Promise<IWeek | null> {
    try {
        const today = new Date()
        const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))

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


        // If the day is found, extract the related week, month, and year
        if (day) {
            const week = await prisma.week.findUnique({
                where: {
                    id: day?.weekId, // Match the date
                },
                include: {
                    days: {
                        include: {
                            tasks: true, // Include tasks associated with the day
                            week: true,
                        },
                    }
                },
            });

            return week as unknown as IWeek
        }

        // If no day is found, return nulls for all
        return null
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
