import prisma from "@/app/lib/prismadb";

const getWeekNumber = (d: Date): [number, number] => {
    // Copy date so we don't modify the original
    let date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  
    // Get the first day of the year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  
    // Calculate full weeks to the nearest Thursday
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  
    // Return an array of year and week number
    return [date.getUTCFullYear(), weekNo];
};

export default async function createWeeksAndDaysForCurrentYear() {
    console.log("Started creating!")
    const currentYear = new Date().getFullYear();

    // Calculate the start and end dates of the current year
    const startDate = new Date(currentYear, 0, 1); // January 1st
    const endDate = new Date(currentYear + 1, 0, 1); // January 1st of the next year

    // Get the first day of the year and the corresponding week number
    let currentDate = startDate;

    // Iterate through the year
    while (currentDate < endDate) {
        const [year, weekNumber] = getWeekNumber(currentDate);
        const weekStartDate = new Date(currentDate);
        
        // Create or find the week entry
        let week = await prisma.week.findUnique({
            where: {
                year_weekNumber: {
                    year: year,
                    weekNumber: weekNumber,
                },
            },
        });

        // If the week doesn't exist, create it
        if (!week) {
            week = await prisma.week.create({
                data: {
                    weekNumber: weekNumber,
                    year: year,
                },
            });
        }
        console.log("week ", weekNumber, " is created")
        // Create days for the current week
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            const dayDate = new Date(weekStartDate);
            dayDate.setDate(weekStartDate.getDate() + dayOffset);
            
            // Check if the day already exists
            const day = await prisma.day.findUnique({
                where: {
                    date: dayDate,
                },
            });

            // If the day doesn't exist, create it
            if (!day) {
                await prisma.day.create({
                    data: {
                        date: dayDate,
                        dayNumber: dayOffset,
                        weekId: week.id, // Associate the day with the created week
                    },
                });
            }
        }

        // Move to the next week
        currentDate.setDate(currentDate.getDate() + 7);
    }
    console.log("Days and weeks for the current year are created!")
}