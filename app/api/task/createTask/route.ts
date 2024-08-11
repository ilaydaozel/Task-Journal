import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { TaskStatus, TaskType } from "@prisma/client";

export async function POST(request: Request) {
    const body = await request.json();
    const {
        name,
        description,
        workedOnDays,
        workedOnWeeks,
        workedOnMonths,
        workedOnYears,
        timeslots,
        tags,
        type = TaskType.TASK,
        parentTaskId,
    } = body;
    
    try {
        // Create the task
        const task = await prisma.task.create({
            data: {
                name,
                description: description || null,
                status: TaskStatus.TODO,
                comments: [],
                workedOnDayIds: workedOnDays?.length ? workedOnDays.map((day: IDay) => day.id) : [],
                workedOnWeekIds: workedOnWeeks?.length ? workedOnWeeks.map((week: IWeek) => week.id) : [],
                workedOnMonthIds: workedOnMonths?.length ? workedOnMonths.map((month: IMonth) => month.id) : [],
                workedOnYearIds: workedOnYears?.length ? workedOnYears.map((year: IYear) => year.id) : [],
                type,
                tags: tags || [],
                parentTaskId: parentTaskId || null, // Set parent task if provided
            },
        });
        // Update the respective workedOn periods with the new task ID
        const updateTasksOnPeriods = async (periods: any[], model: "day" | "week" | "month" | "year") => {
            if (periods?.length) {
                await Promise.all(
                    periods.map(async (period) => {
                        if (model === "day") {
                            await prisma.day.update({
                                where: { id: period.id },
                                data: {
                                    taskIds: {
                                        push: task.id,
                                    },
                                },
                            });
                        } else if (model === "week") {
                            await prisma.week.update({
                                where: { id: period.id },
                                data: {
                                    taskIds: {
                                        push: task.id,
                                    },
                                },
                            });
                        } else if (model === "month") {
                            await prisma.month.update({
                                where: { id: period.id },
                                data: {
                                    taskIds: {
                                        push: task.id,
                                    },
                                },
                            });
                        } else if (model === "year") {
                            await prisma.year.update({
                                where: { id: period.id },
                                data: {
                                    taskIds: {
                                        push: task.id,
                                    },
                                },
                            });
                        }
                    })
                );
            }
        };

        await updateTasksOnPeriods(workedOnDays, 'day');
        await updateTasksOnPeriods(workedOnWeeks, 'week');
        await updateTasksOnPeriods(workedOnMonths, 'month');
        await updateTasksOnPeriods(workedOnYears, 'year');

        // Create and link timeslots if workedOnDays is provided
        if (workedOnDays?.length && timeslots?.length) {
            await Promise.all(
                timeslots.map(async (slot: { dayId: string, startTime: Date, endTime: Date }) => {
                    await prisma.timeSlot.create({
                        data: {
                            taskId: task.id,
                            dayId: slot.dayId,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                        },
                    });
                })
            );
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error adding the task:", error);
        return NextResponse.json({ error: "An error occurred while adding the task: " + error });
    }
}
