enum TaskType {
  TASK = 'TASK',
  MEETING = 'MEETING',
  NOTE = 'NOTE',
  HABIT = 'HABIT'
}

enum TaskStatus {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE'
}

interface ITask {
  id?: string;
  name: string;
  description?: string | null;
  deadlineAt: Date | null;
  status: string;
  comments: string[];
  tags: ITag[];
  tagIds: string[];
  type: TaskType;
  timeslots: ITimeSlot[];
  workedOnDays: IDay[];
  workedOnDayIds: string[];
  workedOnWeeks: IWeek[];
  workedOnWeekIds: string[];
  workedOnMonths: IMonth[];
  workedOnMonthIds: string[];
  workedOnYears: IYear[];
  workedOnYearIds: string[];
  parentTask?: ITask;
  parentTaskId?: string;
  subTasks: ITask[];
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ITag {
  id?: string;
  name: string;
  tasks: ITask[];
  taskIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ITimeSlot {
  id?: string;
  task: ITask;
  taskId: string;
  day: IDay;
  dayId: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ITimeSlot {
  id?: string;
  task: ITask;
  taskId: string;
  day: IDay;
  dayId: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}


interface IDay {
  id?: string;
  date: Date;
  tasks: ITask[];
  taskIds: string[];
  week: IWeek;
  weekId: string;
  timeSlots: ITimeSlot[];
  createdAt: Date;
  updatedAt: Date;
}

interface IWeek {
  id?: string;
  days: IDay[];
  dayIds: string[];
  tasks: ITask[];
  taskIds: string[];
  month: IMonth;
  monthId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IMonth {
  id?: string;
  monthNumber: number;
  weeks: IWeek[];
  weekIds: string[];
  tasks: ITask[];
  taskIds: string[];
  year: IYear;
  yearId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IYear {
  id?: string;
  yearNumber: number;
  months: IMonth[];
  monthIds: string[];
  tasks: ITask[];
  taskIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface INavLink {
  title: string;
  path: string;
}

interface IDayDetails {
  day: IDay | null;
  week: IWeek | null;
  month: IMonth | null;
  year: IYear | null;
}
