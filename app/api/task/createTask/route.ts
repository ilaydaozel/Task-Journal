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
        weekNumber,
    } = body;

    
    try {
        // Get the current year
        const currentYear = new Date().getFullYear();

        // Create or connect the week
        let weekData = await prisma.week.findFirst({
            where: {
                weekNumber: weekNumber,
                year: currentYear,
            },
        });

        if (!weekData) {
            weekData = await prisma.week.create({
                data: {
                    weekNumber: weekNumber,
                    year: currentYear,
                },
            });
        }

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
                weeks: {
                    connect: { id: weekData.id },
                },
            },
        });
        return NextResponse.json(task);
    } catch (error) {
        console.error("Error adding the task:", error);
        return NextResponse.json({ error: "An error occurred while adding the task: " + error });
    }
}