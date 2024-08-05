import prisma from "@/app/lib/prismadb";

export default async function getAllMonths(): Promise<IMonth[]> {
    try {
        const months = await prisma.month.findMany({
            include: {
                weeks: {
                    include: {
                        days: {
                            include: {
                                tasks: true,
                            },
                        },
                    },
                },
            },
        });
        return months as IMonth[]; // Ensure the return type matches IMonth
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
