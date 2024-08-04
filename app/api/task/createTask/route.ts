import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        name,
        description,
        acceptanceCriteria,
        startedAt,
        completedAt,
        deadlineAt,
        status,
        comments,
    } = body;

    try {
        // Create the task
        const task = await prisma.task.create({
            data: {
                name,
                description: description || null,
                acceptanceCriteria: acceptanceCriteria || null,
                startedAt: new Date(startedAt),
                completedAt: new Date(completedAt),
                deadlineAt: new Date(deadlineAt),
                status: status || "to-do",
                comments: comments,
                workedOnDayIds: [], // Assign the days for the task
            },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error adding the task:", error);
        return NextResponse.json({ error: "An error occurred while adding the task: " + error });
    }
}
