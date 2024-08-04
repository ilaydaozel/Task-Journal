import prisma from "@/app/lib/prismadb";

export default async function getAllTasks(): Promise<ITask[]> {
  try {
    const tasksData = await prisma.task.findMany();
    // Ensure tasksData is defined and is an array
    if (!tasksData || !Array.isArray(tasksData)) {
      return []; // Return an empty array if no tasks found
    }
    return tasksData as unknown as ITask[];
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    throw new Error(error);
  }
}