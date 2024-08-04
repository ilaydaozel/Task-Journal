interface ITask {
  id?: string;                    // Unique identifier for the task
  name: string;                   // Name of the task
  description?: string | null;    // Detailed description of the task
  acceptanceCriteria?: string | null;    // Criteria for accepting the task as completed
  deadline?: Date | null;         // Deadline for the task
  status?: string | null;         // Current status of the task
  comments?: string[] | null;     // List of comments associated with the task
  createdAt?: Date;               // Timestamp when the task was created
  updatedAt?: Date;               // Timestamp when the task was last updated
}


interface INavLink {
  title: string;
  path: string;
}