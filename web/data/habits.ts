import { HabitItem } from "@/lib/types/habit";

function getDateDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
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
      { day: getDateDaysAgo(6), status: "SUCCESS", goal: "01:00:00", achieved: "01:15:00", taskId: "t1", isInFrequencyRange: true },
      { day: getDateDaysAgo(5), status: "FAILURE", goal: "01:00:00", achieved: "00:34:12", taskId: "t2", isInFrequencyRange: true },
      { day: getDateDaysAgo(4), status: "FAILURE", goal: "01:00:00", achieved: "00:00:00", taskId: "t3", isInFrequencyRange: true },
      { day: getDateDaysAgo(3), status: "SUCCESS", goal: "01:00:00", achieved: "01:05:00", taskId: "t4", isInFrequencyRange: true },
      { day: getDateDaysAgo(2), status: "SUCCESS", goal: "01:00:00", achieved: "01:21:54", taskId: "t5", isInFrequencyRange: true },
      { day: getDateDaysAgo(1), status: "SUCCESS", goal: "01:00:00", achieved: "02:15:24", taskId: "t6", isInFrequencyRange: true },
      { day: getDateDaysAgo(0), status: "PENDING", goal: "01:00:00", achieved: "00:25:37", taskId: "t7", isInFrequencyRange: true },
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
      { day: getDateDaysAgo(6), status: "FAILURE", taskId: "t1", isInFrequencyRange: true },
      { day: getDateDaysAgo(5), status: "SKIPPED", taskId: "t2", isInFrequencyRange: true },
      { day: getDateDaysAgo(4), status: "SKIPPED", taskId: "t3", isInFrequencyRange: true },
      { day: getDateDaysAgo(3), status: "SUCCESS", taskId: "t4", isInFrequencyRange: true },
      { day: getDateDaysAgo(2), status: "SKIPPED", taskId: "t5", isInFrequencyRange: true },
      { day: getDateDaysAgo(1), status: "SUCCESS", taskId: "t6", isInFrequencyRange: true },
      { day: getDateDaysAgo(0), status: "PENDING", taskId: "t7", isInFrequencyRange: true },
    ],
    isActive: true
  },
  {
    id: "3",
    title: "Estudar Inglês",
    description: "Estudar inglês por pelo menos 1 hora.",
    type: "TIMED",
    frequency: {
      type: "WEEKLY_DAYS",
      weekDays: ["MONDAY", "WEDNESDAY", "FRIDAY"]
    },
    category: {
      id: "c3",
      name: "Estudos",
      icon: "book",
      color: "green"
    },
    streak: 4,
    successRate: 0.5714,
    startDate: getDateDaysAgo(30),
    endDate: null,
    weekProgress: [
      { day: getDateDaysAgo(19), status: "SUCCESS", goal: "01:00:00", achieved: "01:10:00", taskId: "t20", isInFrequencyRange: true },
      { day: getDateDaysAgo(18), status: "FAILURE", goal: "01:00:00", achieved: "00:45:00", taskId: "t19", isInFrequencyRange: false },
      { day: getDateDaysAgo(17), status: "SKIPPED", goal: "01:00:00", achieved: "00:00:00", taskId: "t18", isInFrequencyRange: false },
      { day: getDateDaysAgo(16), status: "SUCCESS", goal: "01:00:00", achieved: "01:05:00", taskId: "t17", isInFrequencyRange: true },
      { day: getDateDaysAgo(15), status: "FAILURE", goal: "01:00:00", achieved: "00:30:00", taskId: "t16", isInFrequencyRange: true },
      { day: getDateDaysAgo(14), status: "SUCCESS", goal: "01:00:00", achieved: "01:20:00", taskId: "t15", isInFrequencyRange: false },
      { day: getDateDaysAgo(13), status: "SKIPPED", goal: "01:00:00", achieved: "00:00:00", taskId: "t14", isInFrequencyRange: false },
      { day: getDateDaysAgo(12), status: "SUCCESS", goal: "01:00:00", achieved: "01:15:00", taskId: "t13", isInFrequencyRange: true },
      { day: getDateDaysAgo(11), status: "FAILURE", goal: "01:00:00", achieved: "00:40:00", taskId: "t12", isInFrequencyRange: true },
      { day: getDateDaysAgo(10), status: "SUCCESS", goal: "01:00:00", achieved: "01:00:00", taskId: "t11", isInFrequencyRange: false },
      { day: getDateDaysAgo(9), status: "SKIPPED", goal: "01:00:00", achieved: "00:00:00", taskId: "t10", isInFrequencyRange: false },
      { day: getDateDaysAgo(8), status: "SUCCESS", goal: "01:00:00", achieved: "01:25:00", taskId: "t9", isInFrequencyRange: true },
      { day: getDateDaysAgo(7), status: "FAILURE", goal: "01:00:00", achieved: "00:50:00", taskId: "t8", isInFrequencyRange: true },
      { day: getDateDaysAgo(6), status: "SUCCESS", goal: "01:00:00", achieved: "01:30:00", taskId: "t7", isInFrequencyRange: false },
      { day: getDateDaysAgo(5), status: "SKIPPED", goal: "01:00:00", achieved: "00:00:00", taskId: "t6", isInFrequencyRange: false },
      { day: getDateDaysAgo(4), status: "FAILURE", goal: "01:00:00", achieved: "00:45:00", taskId: "t5", isInFrequencyRange: true },
      { day: getDateDaysAgo(3), status: "SUCCESS", goal: "01:00:00", achieved: "01:10:00", taskId: "t4", isInFrequencyRange: true },
      { day: getDateDaysAgo(2), status: "SKIPPED", goal: "01:00:00", achieved: "00:00:00", taskId: "t3", isInFrequencyRange: false },
      { day: getDateDaysAgo(1), status: "SUCCESS", goal: "01:00:00", achieved: "01:05:00", taskId: "t2", isInFrequencyRange: true },
      { day: getDateDaysAgo(0), status: "PENDING", goal: "01:00:00", achieved: "00:00:00", taskId: "t1", isInFrequencyRange: false },
    ],
    isActive: false
  }
]