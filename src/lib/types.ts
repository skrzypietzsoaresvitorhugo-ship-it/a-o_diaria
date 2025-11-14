export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  points: number;
}

export interface Stats {
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  totalTasksCompleted: number;
  tasksCompletedToday: number;
  tasksCompletedThisWeek: number;
  focusTimeToday: number;
  focusTimeThisWeek: number;
  lastCompletionDate?: string;
}
