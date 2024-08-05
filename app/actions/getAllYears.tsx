import prisma from "@/app/lib/prismadb";

export default async function getAllYears(): Promise<IYear[]> {
    try {
        const years = await prisma.year.findMany({
            include: {
                months: {
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
                },
            },
        });
        return years as IYear[]; // Ensure the return type matches IYear
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
