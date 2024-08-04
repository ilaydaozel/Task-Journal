interface ITask {
  id?: string;                    // Unique identifier for the task
  name: string;                   // Name of the task
  description?: string | null;    // Detailed description of the task
  acceptanceCriteria?: string | null;    // Criteria for accepting the task as completed
  startedAt: Date;                // Start date of the task
  completedAt: Date;              // Completion date of the task
  deadlineAt: Date;               // Deadline for the task
  status: string;                 // Current status of the task
  comments: string[];             // List of comments associated with the task                
  workedOnDays: IDay[];          // Days the task was worked on
  workedOnDayIds: String[];       // Array of IDs for worked on days
  createdAt: Date;                // Timestamp when the task was created
  updatedAt: Date;                // Timestamp when the task was last updated
}

interface IDay {
  id?: string;                    // Unique identifier for the day
  date: Date;                     // Specific date of the day
  dayNumber: number;              // Day number in the week
  tasks: ITask[];                 // Tasks assigned to the day
  taskIds: String[];              // Array of task IDs assigned to the day
  week: IWeek;                    // Week the day belongs to
  weekId: string;                 // ID of the week
  createdAt: Date;                // Timestamp when the day was created
  updatedAt: Date;                // Timestamp when the day was last updated
}

interface IWeek {
  id?: string;                    // Unique identifier for the week
  weekNumber: number;             // Week number (1-52)
  year: number;                   // Year
  days: IDay[];                   // Days in the week
  dayIds: String[];               // Array of day IDs in the week
  createdAt: Date;                // Timestamp when the week was created
  updatedAt: Date;                // Timestamp when the week was last updated
}

interface INavLink {
  title: string;
  path: string;
}
