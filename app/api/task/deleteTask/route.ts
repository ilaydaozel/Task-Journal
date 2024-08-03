import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function DELETE(request: Request) {
    const { id } = await request.json();
    try {
        // Find the task by ID and delete it
        const deletedTask = await prisma.task.delete({
            where: { id: id }
        });
        return NextResponse.json(deletedTask);
    } catch (error) {
        console.error("Error deleting the task:", error);
        return NextResponse.json({ error: "An error occurred while deleting the task: " + error });
    }
}
