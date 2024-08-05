import prisma from "@/app/lib/prismadb";
import { getWeekNumber } from "../utils/Helper";


export default async function createYearsMonthsWeeksAndDays() {
    console.log("Started creating!");

    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 3;

    /*
    // Drop existing days and weeks
    await prisma.day.deleteMany({});
    await prisma.week.deleteMany({});
    await prisma.month.deleteMany({});
    await prisma.year.deleteMany({});
    console.log("Deleted all days, weeks, months, and years!")
    */

    for (let year = currentYear; year < endYear; year++) {
        let yearRecord = await prisma.year.findUnique({
            where: {
                yearNumber: year,
            },
        });

        if (!yearRecord) {
            yearRecord = await prisma.year.create({
                data: {
                    yearNumber: year,
                },
            });
        }

        for (let month = 1; month <= 12; month++) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1);

            let monthRecord = await prisma.month.findUnique({
                where: {
                    yearId_monthNumber: {
                        yearId: yearRecord.id,
                        monthNumber: month,
                    },
                },
            });

            if (!monthRecord) {
                monthRecord = await prisma.month.create({
                    data: {
                        monthNumber: month,
                        yearId: yearRecord.id,
                    },
                });
            }

            let currentDate = startDate;

            while (currentDate < endDate) {
                const weekStartDate = new Date(currentDate);
                const [_, weekNumber] = getWeekNumber(currentDate);

                let week = await prisma.week.findUnique({
                    where: {
                        monthId_weekNumber: {
                            monthId: monthRecord.id,
                            weekNumber: weekNumber,
                        },

                    },
                });

                if (!week) {
                    week = await prisma.week.create({
                        data: {
                            weekNumber: weekNumber,
                            monthId: monthRecord.id,
                        },
                    });
                }

                for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
                    const dayDate = new Date(weekStartDate);
                    dayDate.setDate(weekStartDate.getDate() + dayOffset);

                    if (dayDate >= endDate) break;

                    const day = await prisma.day.findUnique({
                        where: {
                            date: dayDate,
                        },
                    });

                    if (!day) {
                        await prisma.day.create({
                            data: {
                                date: dayDate,
                                dayNumber: dayOffset,
                                weekId: week.id,
                            },
                        });
                    }
                }

                currentDate.setDate(currentDate.getDate() + 7);
            }
        }
    }
    console.log("Years, months, weeks, and days created for the next 3 years!");
}