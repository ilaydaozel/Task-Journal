import prisma from "@/app/lib/prismadb";

interface IParams {
    taskId?: string;
}

export default async function getTaskById(params: IParams): Promise<ITask | null> {
    try {
        const { taskId } = params;

        if (!taskId || taskId.length !== 24) {
            throw new Error("Invalid taskId provided.");
        }

        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                workedOnDays: true, // Include days associated with the task
            },
        });
        
        if (!task) {
            return null;
        }

        return task as ITask;
    } catch (error: any) {
        throw new Error(error.message || error);
    }
}
