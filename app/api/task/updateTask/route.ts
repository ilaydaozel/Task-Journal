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
            return NextResponse.json({ error: "Task not found." }, { status: 404 });
        }

        // Validate fieldName before updating
        const validFields = [
            "name",
            "description",
            "acceptanceCriteria",
            "startedAt",
            "completedAt",
            "deadlineAt",
            "status",
            "comments",
            "workedOnDays" // Add workedOnDays to valid fields
        ];

        if (!validFields.includes(fieldName)) {
            return NextResponse.json({ error: "Invalid field name." }, { status: 400 });
        }

        // Handle workedOnDays separately for adding/removing days
        if (fieldName === "workedOnDays") {
            const { action, dayId } = fieldValue; // Expecting an action to add or remove a day

            if (action === "add") {
                await prisma.task.update({
                    where: { id: id },
                    data: {
                        workedOnDays: {
                            connect: { id: dayId } // Connect the task to the day
                        }
                    }
                });
            } else if (action === "remove") {
                await prisma.task.update({
                    where: { id: id },
                    data: {
                        workedOnDays: {
                            disconnect: { id: dayId } // Disconnect the task from the day
                        }
                    }
                });
            }
        } else {
            // Update the specified field for other fields
            const updatedTask = await prisma.task.update({
                where: { id: id },
                data: {
                    [fieldName]: fieldValue
                }
            });
            return NextResponse.json(updatedTask);
        }

        // Return the updated task after modifying workedOnDays
        const updatedTask = await prisma.task.findUnique({
            where: { id: id },
            include: { workedOnDays: true } // Include workedOnDays in the response
        });
        
        return NextResponse.json(updatedTask);
    } catch (error: any) {
        console.error("Error updating the task:", error);
        const errorMessage = error.code === 'P2025' ? // Prisma error code for "Record not found"
            "Task not found." :
            "An error occurred while updating the task: " + error.message;
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
