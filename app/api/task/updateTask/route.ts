import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function PUT(request: Request) {
    const { id, fieldName, fieldValue } = await request.json();
    try {
        // Find the task by ID
        const existingTask = await prisma.task.findUnique({
            where: { id: id }
        });
        if (!existingTask) {
            return NextResponse.error();
        }

        // Update the specified field
        const updatedTask = await prisma.task.update({
            where: { id: id },
            data: {
                [fieldName]: fieldValue
            }
        });
        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error("Error updating the task:", error);
        return NextResponse.error();
    }
}
