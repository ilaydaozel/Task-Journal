interface ITask {
  id?: string;                    // Unique identifier for the task
  name: string;                   // Name of the task
  description?: string | null;    // Detailed description of the task
  acceptanceCriteria?: string | null; // Criteria for accepting the task as completed
  startedAt: Date;                // Start date of the task
  completedAt: Date;              // Completion date of the task
  deadlineAt: Date;               // Deadline for the task
  status: string;                 // Current status of the task
  comments: string[];             // List of comments associated with the task                
  workedOnDays: IDay[];           // Days the task was worked on
  workedOnDayIds: string[];       // Array of IDs for worked on days
  createdAt: Date;                // Timestamp when the task was created
  updatedAt: Date;                // Timestamp when the task was last updated
}

interface IDay {
  id?: string;                    // Unique identifier for the day
  date: Date;                     // Specific date of the day
  tasks: ITask[];                 // Tasks assigned to the day
  taskIds: string[];              // Array of task IDs assigned to the day
  week: IWeek;                    // Week the day belongs to
  weekId: string;                 // ID of the week
  createdAt: Date;                // Timestamp when the day was created
  updatedAt: Date;                // Timestamp when the day was last updated
}

interface IWeek {
  id?: string;                    // Unique identifier for the week
  days: IDay[];                   // Days in the week
  dayIds: string[];               // Array of day IDs in the week
  month: IMonth;                  // Month the week belongs to
  monthId: string;                // ID of the month
  createdAt: Date;                // Timestamp when the week was created
  updatedAt: Date;                // Timestamp when the week was last updated
}

interface IMonth {
  id?: string;                    // Unique identifier for the month
  monthNumber: number;            // Month number (1-12)
  weeks: IWeek[];                 // Weeks in the month
  weekIds: string[];              // Array of week IDs in the month
  year: IYear;                    // Year the month belongs to
  yearId: string;                 // ID of the year
  createdAt: Date;                // Timestamp when the month was created
  updatedAt: Date;                // Timestamp when the month was last updated
}

interface IYear {
  id?: string;                    // Unique identifier for the year
  yearNumber: number;             // Year number (e.g., 2024)
  months: IMonth[];               // Months in the year
  monthIds: string[];             // Array of month IDs in the year
  createdAt: Date;                // Timestamp when the year was created
  updatedAt: Date;                // Timestamp when the year was last updated
}

interface INavLink {
  title: string;                  // Title of the navigation link
  path: string;                   // Path for the navigation link
}
