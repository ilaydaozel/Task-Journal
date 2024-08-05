import prisma from "@/app/lib/prismadb";

export default async function getAllTasks(): Promise<ITask[]> {
  try {
      const tasks = await prisma.task.findMany({
          include: {
              workedOnDays: true,
          },
      });
      return tasks as unknown as ITask[];
  } catch (error: any) {
      throw new Error(error.message || error);
  }
}
