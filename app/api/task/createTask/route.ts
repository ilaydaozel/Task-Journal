import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        name,
        description,
        acceptanceCriteria,
        deadlineAt,
        workedOnDayIds
    } = body;
    console.log("workedOnDayIds route: ", workedOnDayIds)
    try {
        // Create the task
        const task = await prisma.task.create({
            data: {
                name,
                description: description || null,
                acceptanceCriteria: acceptanceCriteria || null,
                startedAt: null,
                completedAt: null,
                deadlineAt: new Date(deadlineAt) || null,
                status: "to-do",
                comments: [],
                workedOnDayIds: workedOnDayIds || [],
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error adding the task:", error);
        return NextResponse.json({ error: "An error occurred while adding the task: " + error });
    }
}
