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
            "workedOnDays",
            "workedOnWeeks",
            "workedOnMonths",
            "workedOnYears",
            "parentTask", // For setting a parent task
            "private" // For setting privacy
        ];

        if (!validFields.includes(fieldName)) {
            return NextResponse.json({ error: "Invalid field name." }, { status: 400 });
        }

        // Handle workedOnDays, workedOnWeeks, workedOnMonths, workedOnYears separately for adding/removing
        if (["workedOnDays", "workedOnWeeks", "workedOnMonths", "workedOnYears"].includes(fieldName)) {
            const { action, id: timeId } = fieldValue; // Expecting an action to add or remove

            const relationField = fieldName === "workedOnDays" ? "workedOnDays" :
                                  fieldName === "workedOnWeeks" ? "workedOnWeeks" :
                                  fieldName === "workedOnMonths" ? "workedOnMonths" :
                                  "workedOnYears";

            if (action === "add") {
                await prisma.task.update({
                    where: { id: id },
                    data: {
                        [relationField]: {
                            connect: { id: timeId } // Connect the task to the corresponding time relation
                        }
                    }
                });
            } else if (action === "remove") {
                await prisma.task.update({
                    where: { id: id },
                    data: {
                        [relationField]: {
                            disconnect: { id: timeId } // Disconnect the task from the corresponding time relation
                        }
                    }
                });
            }
        } else if (fieldName === "parentTask") {
            // Handle parent task update
            const { parentId } = fieldValue; // Expecting a new parent task ID
            await prisma.task.update({
                where: { id: id },
                data: {
                    parentTask: {
                        connect: { id: parentId } // Connect the new parent task
                    }
                }
            });
        } else if (fieldName === "subTasks") {
            // Handle subtask updates
            const { action, subTaskId } = fieldValue; // Expecting an action to add or remove a subtask

            if (action === "add") {
                await prisma.task.update({
                    where: { id: id },
                    data: {
                        subTasks: {
                            connect: { id: subTaskId } // Connect the subtask
                        }
                    }
                });
            } else if (action === "remove") {
                await prisma.task.update({
                    where: { id: id },
                    data: {
                        subTasks: {
                            disconnect: { id: subTaskId } // Disconnect the subtask
                        }
                    }
                });
            }
        } else if (fieldName === "timeslot") {
            // Handle timeslot updates
            const { action, timeslotId, timeslotData } = fieldValue; // Expecting action, ID, and data for timeslot

            if (action === "add") {
                await prisma.timeSlot.create({
                    data: {
                        ...timeslotData,
                        task: {
                            connect: { id: id }
                        }
                    }
                });
            } else if (action === "update") {
                await prisma.timeSlot.update({
                    where: { id: timeslotId },
                    data: timeslotData // Update timeslot with new data
                });
            } else if (action === "remove") {
                await prisma.timeSlot.delete({
                    where: { id: timeslotId } // Delete the specified timeslot
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

        // Return the updated task after modifying all applicable fields
        const updatedTask = await prisma.task.findUnique({
            where: { id: id },
            include: {
                workedOnDays: true,
                workedOnWeeks: true,
                workedOnMonths: true,
                workedOnYears: true,
                subTasks: true,
                parentTask: true,
                timeslots: true // Include timeslots in the response
            }
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
