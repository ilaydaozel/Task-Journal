import prisma from "@/app/lib/prismadb";

async function createYearAndMonths(year: number) {
    let yearRecord = await prisma.year.findUnique({
        where: {
            yearNumber: year,
        },
    });

    if (!yearRecord) {
        console.log("Creating new year ", year);

        // Create the year record
        yearRecord = await prisma.year.create({
            data: {
                yearNumber: year,
            },
        });

        // Create months and collect their IDs
        const monthIds: string[] = []; // Initialize an array to store month IDs

        for (let month = 1; month <= 12; month++) {    
            const monthRecord = await createMonth(month, yearRecord);
            yearRecord = await prisma.year.update({
                where: { id: yearRecord.id },
                data: { 
                    monthIds: {
                        push: monthRecord.id 
                    } 
                },
            });
        }

        // Update the year record with the month IDs
        yearRecord = await prisma.year.update({
            where: { id: yearRecord.id },
            data: { monthIds: monthIds },
        });

        console.log("Months created for year:", year);
    }

    return yearRecord;
}

async function createMonth(
    month: number, 
    yearRecord: {
        id: string;
        yearNumber: number;
        monthIds: string[];
        createdAt: Date;
        updatedAt: Date;
    }
) {
    let monthRecord = await prisma.month.findUnique({
        where: {
            yearId_monthNumber: {
                yearId: yearRecord.id,
                monthNumber: month,
            },
        },
    });

    if (!monthRecord) {
        console.log("Creating new month ", month);
        monthRecord = await prisma.month.create({
            data: {
                monthNumber: month,
                yearId: yearRecord.id,
            },
        });

        const startDate = new Date(yearRecord.yearNumber, month - 1, 1);
        const endDate = new Date(yearRecord.yearNumber, month, 1);

        let currentDate = startDate;

        // Adjust currentDate to the first Monday on or before startDate
        while (currentDate.getDay() !== 1) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        while (currentDate < endDate) {
            // Create the week only if it does not already exist
            let weekRecord = await createWeek(monthRecord.id);

            // Update the month record with the week ID
            monthRecord = await prisma.month.update({
                where: { id: monthRecord.id },
                data: {
                    weekIds: {
                        push: weekRecord.id, // Use push to add to the existing array
                    },
                },
            });

            for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
                const dayDate = new Date(currentDate);
                dayDate.setDate(currentDate.getDate() + dayOffset);

                if (dayDate >= endDate) break;

                // Create day only if the day is within the current month
                if (dayDate.getMonth() === month - 1) {
                    const dayRecord = await createDay(dayDate, weekRecord.id);
                    
                    // Update the week record with the day ID
                    weekRecord = await prisma.week.update({
                        where: { id: weekRecord.id },
                        data: {
                            dayIds: {
                                push: dayRecord.id, // Use push to add to the existing array
                            },
                        },
                    });
                } else {
                    // Leave previous days empty by not creating them
                    console.log(`Leaving ${dayDate.toDateString()} empty (not in month)`);
                }
            }

            currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
        }
    }

    return monthRecord;
}

async function createWeek(monthRecordId: string) {
    console.log("Creating new week ");
    // Create the week record associated with a month
    let week = await prisma.week.create({
        data: {
            monthId: monthRecordId,
        },
    });
    return week;
}

async function createDay(dayDate: Date, weekId: string) {
    let day = await prisma.day.findUnique({
        where: {
            date: dayDate,
        },
    });

    if (!day) {
        // Create the day record associated with a week
        day = await prisma.day.create({
            data: {
                date: dayDate,
                weekId: weekId,
            },
        });
    }

    return day;
}

async function deleteExistingData(){
    // Drop existing days and weeks
    await prisma.day.deleteMany({});
    await prisma.week.deleteMany({});
    await prisma.month.deleteMany({});
    await prisma.year.deleteMany({});
    console.log("Deleted all days, weeks, months, and years!");
}

export default async function createYearsMonthsWeeksAndDays() {
    console.log("Started creating!");

    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 2;
    //deleteExistingData();

    for (let year = currentYear; year < endYear; year++) {
        await createYearAndMonths(year);
    }
    
    console.log("Years, months, weeks, and days created for the next years!");
}
