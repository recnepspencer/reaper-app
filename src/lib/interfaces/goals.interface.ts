// src/lib/interfaces/goals.interface.ts

export type GoalType = 'TIMER' | 'COUNTER' | 'YESNO';

export interface GoalData {
  title: string;
  description: string;
  type: GoalType;
}

export interface UpdateGoalData {
  title?: string;
  description?: string;
  type?: GoalType;
}

export interface UserGoal {
  userId: string; // Changed to string
  streak?: number;
  totalCount?: number;
  totalDuration?: number;
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  type: GoalType;
  users: UserGoal[];
}
