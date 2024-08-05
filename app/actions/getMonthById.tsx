import prisma from "@/app/lib/prismadb";

interface IMonthParams {
    monthId?: string;
}

export default async function getMonthById(params: IMonthParams): Promise<IMonth | null> {
    try {
        const { monthId } = params;

        if (!monthId || monthId.length !== 24) {
            throw new Error("Invalid monthId provided.");
        }

        const month = await prisma.month.findUnique({
            where: {
                id: monthId,
            },
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

        if (!month) {
            return null;
        }

        return month as IMonth;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
