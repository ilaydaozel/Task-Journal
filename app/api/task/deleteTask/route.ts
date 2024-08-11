import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function DELETE(request: Request) {
    const { id } = await request.json(); // Expecting an ID to delete

    try {
        // Find the task by ID
        const existingTask = await prisma.task.findUnique({
            where: { id: id }
        });

        if (!existingTask) {
            return NextResponse.json({ error: "Task not found." }, { status: 404 });
        }

        // Delete the task
        await prisma.task.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Task deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error deleting the task:", error);
        return NextResponse.json({ error: "An error occurred while deleting the task." }, { status: 500 });
    }
}
