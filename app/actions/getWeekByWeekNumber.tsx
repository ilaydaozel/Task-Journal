import prisma from "@/app/lib/prismadb";

interface IParams {
    weekNumber: number;
}

export default async function getTaskById(
    params: IParams
) {
    try {
        const { weekNumber } = params;
        const week = await prisma.week.findFirst({
            where: {
                weekNumber: weekNumber,
            },
        });
        if (!week) {
            return null;
        }
        return week as unknown as IWeek
    } catch (error: any) {
        throw new Error(error);
    }
}
