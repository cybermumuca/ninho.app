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
  description?: string;
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
    taskId: string;
  }[];
  isActive: boolean;
}

export const mockHabitsList: HabitItem[] = [
  {
    id: "1",
    title: "Praticar no teclado",
    description: "Praticar escalas e músicas no teclado por pelo menos 1 hora.",
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
      { day: getDateDaysAgo(6), status: "SUCCESS", goal: "01:00:00", achieved: "01:15:00", taskId: "t1" },
      { day: getDateDaysAgo(5), status: "FAILURE", goal: "01:00:00", achieved: "00:34:12", taskId: "t2" },
      { day: getDateDaysAgo(4), status: "FAILURE", goal: "01:00:00", achieved: "00:00:00", taskId: "t3" },
      { day: getDateDaysAgo(3), status: "SUCCESS", goal: "01:00:00", achieved: "01:05:00", taskId: "t4" },
      { day: getDateDaysAgo(2), status: "SUCCESS", goal: "01:00:00", achieved: "01:21:54", taskId: "t5" },
      { day: getDateDaysAgo(1), status: "SUCCESS", goal: "01:00:00", achieved: "02:15:24", taskId: "t6" },
      { day: getDateDaysAgo(0), status: "PENDING", goal: "01:00:00", achieved: "00:25:37", taskId: "t7" },
    ],
    isActive: true
  },
  {
    id: "2",
    title: "Praticar Jiu-Jitsu",
    description: "Ir para o treino de Jiu-Jitsu pelo menos 3 vezes por semana.",
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
      { day: getDateDaysAgo(6), status: "FAILURE", taskId: "t1" },
      { day: getDateDaysAgo(5), status: "SKIPPED", taskId: "t2" },
      { day: getDateDaysAgo(4), status: "SKIPPED", taskId: "t3" },
      { day: getDateDaysAgo(3), status: "SUCCESS", taskId: "t4" },
      { day: getDateDaysAgo(2), status: "SKIPPED", taskId: "t5" },
      { day: getDateDaysAgo(1), status: "SUCCESS", taskId: "t6" },
      { day: getDateDaysAgo(0), status: "PENDING", taskId: "t7" },
    ],
    isActive: true
  }
]