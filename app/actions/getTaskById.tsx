import prisma from "@/app/lib/prismadb";

interface IParams {
    taskId?: string;
}

export default async function getTaskById(
    params: IParams
) {
    try {
        const { taskId } = params;
        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
        });
        if (!task) {
            return null;
        }
        return task as unknown as ITask;
    } catch (error: any) {
        throw new Error(error);
    }
}
