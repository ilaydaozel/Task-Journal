import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        name,
        description,
        deadlineAt,
        workedOnDays
    } = body;
    
    try {
        // Create the task
        const task = await prisma.task.create({
            data: {
                name,
                description: description || null,
                deadlineAt: new Date(deadlineAt) || null,
                status: "to-do",
                comments: [],
                workedOnDayIds: workedOnDays
                    .map((day: IDay) => day.id).filter((id: string | undefined): id is string => id !== undefined)|| [],
                type: "task",
                tags: [],
            },
        });

         // Update workedOnDays with the new task ID
         await Promise.all(
            workedOnDays.map(async (day: IDay) => {
                await prisma.day.update({
                    where: { id: day.id }, // Identify the day to update
                    data: {
                        taskIds: {
                            push: task.id, // Add the new task ID to the taskIds array
                        },
                    },
                });
            })
        );

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error adding the task:", error);
        return NextResponse.json({ error: "An error occurred while adding the task: " + error });
    }
}
