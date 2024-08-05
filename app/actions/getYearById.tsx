import prisma from "@/app/lib/prismadb";

interface IYearParams {
    yearId?: string;
}

export default async function getYearById(params: IYearParams): Promise<IYear | null> {
    try {
        const { yearId } = params;

        if (!yearId || yearId.length !== 24) {
            throw new Error("Invalid yearId provided.");
        }

        const year = await prisma.year.findUnique({
            where: {
                id: yearId,
            },
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

        if (!year) {
            return null; // Return null if no year is found
        }

        return year as IYear;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
