import prisma from "@/app/lib/prismadb";

export default async function getAllWeeks(): Promise<IWeek[]> {
    try {
        const weeks = await prisma.week.findMany({
            include: {
                days: {
                    include: {
                        tasks: true,
                    },
                },
            },
        });
        return weeks as unknown as IWeek[];
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
