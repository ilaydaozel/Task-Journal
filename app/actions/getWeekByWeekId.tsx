import prisma from "@/app/lib/prismadb";

interface IParams {
    weekId?: string;
}

export default async function getWeekByWeekId(
    params: IParams
): Promise<IWeek> {
    try {
        const { weekId } = params;
        console.log("provided week id: " + weekId);

        // Check if weekId is defined and is a valid ObjectID (24 characters long in hex)
        if (!weekId || weekId.length !== 24) {
            throw new Error("Invalid weekId provided.");
        }

        // Retrieve the week along with its associated days and tasks
        const weekWithDaysAndTasks = await prisma.week.findUnique({
            where: {
                id: weekId,
            },
            include: {
                days: {
                    include: {
                        tasks: true, // Include tasks associated with each day
                    },
                },
            },
        });

        // Check if the week exists
        if (!weekWithDaysAndTasks) {
            throw new Error("Week not found.");
        }

        // Return the week with its associated days and tasks
        return weekWithDaysAndTasks as unknown as IWeek;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
