interface ITask {
  id?: string;                    // Unique identifier for the task
  name: string;                   // Name of the task
  description?: string | null;    // Detailed description of the task
  acceptanceCriteria?: string | null;    // Criteria for accepting the task as completed
  startedAt: Date;                // Start date of the task
  completedAt: Date;              // Completion date of the task
  deadlineAt: Date;               // Deadline for the task
  status: string;                 // Current status of the task
  comments: string[];             // List of comments associated with the task                // Weeks the task belongs to
  weekIds: String[];
  createdAt: Date;                // Timestamp when the task was created
  updatedAt: Date;                // Timestamp when the task was last updated
}

interface IWeek {
  id?: string;                    // Unique identifier for the week
  weekNumber: number;             // Week number (1-52)
  year: number;                   // Year
  taskIds: String[];
  createdAt: Date;                // Timestamp when the week was created
  updatedAt: Date;                // Timestamp when the week was last updated
}

interface INavLink {
  title: string;
  path: string;
}