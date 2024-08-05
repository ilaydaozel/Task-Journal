import prisma from "@/app/lib/prismadb";

interface IDayParams {
    dayId?: string;
}

export default async function getDayByDayId(params: IDayParams): Promise<IDay | null> {
    try {
        const { dayId } = params;

        if (!dayId || dayId.length !== 24) {
            throw new Error("Invalid dayId provided.");
        }

        const dayWithTasks = await prisma.day.findUnique({
            where: {
                id: dayId,
            },
            include: {
                tasks: true,
                week: true, // Include week associated with the day
            },
        });

        if (!dayWithTasks) {
            return null; // Return null if no year is found
        }

        return dayWithTasks as IDay;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
