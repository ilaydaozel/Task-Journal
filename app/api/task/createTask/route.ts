import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        name,
        description,
        acceptanceCriteria,
        deadline,
        status,
        comments,
    } = body;

    try {
        const task: ITask = await prisma.task.create({
            data: {
                name: name,
                description: description,
                acceptanceCriteria: acceptanceCriteria,
                deadline: new Date(deadline),
                status: status,
                comments: [],
            },
        });
        return NextResponse.json(task);

    }catch (error) {
        console.error("Error adding the task:", error);
        return NextResponse.json({ error: "An error occurred while adding the task: " + error });
    }


    
}
