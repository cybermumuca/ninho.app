function getDateDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

type DAILY_FREQUENCY = {
  type: "DAILY";
}

type PERIOD_COUNT_FREQUENCY = {
  type: "PERIOD_COUNT";
  count: number;
  period: "WEEK" | "MONTH" | "YEAR";
}

interface HabitItem {
  id: string;
  title: string;
  type: "SUCCESS_FAILURE" | "TIMED";
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
  weekProgress: {
    day: string;
    status: "SUCCESS" | "FAILURE" | "SKIPPED" | "PENDING";
    goal?: string;
    achieved?: string;
  }[];
  isActive: boolean;
}

export const mockHabitsList: HabitItem[] = [
  {
    id: "1",
    title: "Praticar no teclado",
    type: "TIMED",
    frequency: {
      type: "DAILY"
    },
    category: {
      id: "c1",
      name: "Música",
      icon: "music",
      color: "purple"
    },
    streak: 3,
    successRate: 0.6667,
    startDate: getDateDaysAgo(6),
    endDate: null,
    weekProgress: [
      { day: getDateDaysAgo(6), status: "SUCCESS", goal: "01:00:00", achieved: "01:15:00" },
      { day: getDateDaysAgo(5), status: "FAILURE", goal: "01:00:00", achieved: "00:34:12" },
      { day: getDateDaysAgo(4), status: "FAILURE", goal: "01:00:00", achieved: "00:00:00" },
      { day: getDateDaysAgo(3), status: "SUCCESS", goal: "01:00:00", achieved: "01:05:00" },
      { day: getDateDaysAgo(2), status: "SUCCESS", goal: "01:00:00", achieved: "01:21:54" },
      { day: getDateDaysAgo(1), status: "SUCCESS", goal: "01:00:00", achieved: "02:15:24" },
      { day: getDateDaysAgo(0), status: "PENDING", goal: "01:00:00", achieved: "00:25:37" },
    ],
    isActive: true
  },
  {
    id: "2",
    title: "Praticar Jiu-Jitsu",
    type: "SUCCESS_FAILURE",
    frequency: {
      type: "PERIOD_COUNT",
      count: 3,
      period: "WEEK"
    },
    category: {
      id: "c2",
      name: "Esporte",
      icon: "dumbbell",
      color: "blue"
    },
    streak: 2,
    successRate: 0.4286,
    startDate: getDateDaysAgo(13),
    endDate: null,
    weekProgress: [
      { day: getDateDaysAgo(6), status: "FAILURE" },
      { day: getDateDaysAgo(5), status: "SKIPPED" },
      { day: getDateDaysAgo(4), status: "SKIPPED" },
      { day: getDateDaysAgo(3), status: "SUCCESS" },
      { day: getDateDaysAgo(2), status: "SKIPPED" },
      { day: getDateDaysAgo(1), status: "SUCCESS" },
      { day: getDateDaysAgo(0), status: "PENDING" },
    ],
    isActive: true
  }
]