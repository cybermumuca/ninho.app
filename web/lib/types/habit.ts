export type DAILY_FREQUENCY = {
  type: "DAILY";
}

export type PERIOD_COUNT_FREQUENCY = {
  type: "PERIOD_COUNT";
  count: number;
  period: "WEEK" | "MONTH" | "YEAR";
}

export type HabitType = "SUCCESS_FAILURE" | "TIMED";

export type HabitWeekProgressStatus = "SUCCESS" | "FAILURE" | "SKIPPED" | "PENDING" | "NONE";

export interface HabitWeekProgress {
  day: string;
  status: HabitWeekProgressStatus;
  goal?: string;
  achieved?: string;
  taskId: string;
  isInFrequencyRange: boolean;
}

export interface HabitItem {
  id: string;
  title: string;
  description: string;
  type: HabitType;
  frequency: DAILY_FREQUENCY | PERIOD_COUNT_FREQUENCY;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  streak: number;
  successRate: number;
  startDate: string;
  endDate: string | null;
  weekProgress: HabitWeekProgress[];
  isActive: boolean;
}
