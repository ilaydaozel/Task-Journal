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
        // Retrieve the week along with its associated tasks
        const weekWithTasks = await prisma.week.findUnique({
            where: {
                id: weekId,
            },
            include: {
                tasks: true, // Assuming there's a relation to tasks in your Week model
            },
        });

        // Return the tasks associated with the week
        return weekWithTasks as unknown as IWeek;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
