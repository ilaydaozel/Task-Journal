import prisma from "@/app/lib/prismadb";

export default async function getAllDays(): Promise<IDay[]> {
    try {
        const days = await prisma.day.findMany({
            include: {
                tasks: true,
                week: true,
            },
        });
        return days as unknown as IDay[];
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
