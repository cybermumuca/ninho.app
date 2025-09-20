import { Task } from "@/lib/types/task";

function getDateDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function getDateDaysAhead(daysAhead: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
}

export const mockTasksList: Task[] = [
  {
    id: "task-1",
    title: "Estudar React Advanced Patterns",
    categoryId: "5",
    category: {
      id: "5",
      name: "Estudos",
      icon: "book",
      color: "orange"
    },
    startDate: getDateDaysAgo(1),
    dueDate: getDateDaysAhead(2),
    startDateTime: "09:00",
    dueDateTime: "11:00",
    estimatedDuration: 120,
    annotation: "Focar nos padrões render props e compound components",
    tagIds: ["2", "5"],
    tags: [
      { id: "2", name: "trabalho", color: "blue" },
      { id: "5", name: "finanças", color: "yellow" }
    ],
    status: "IN_PROGRESS",
    priority: "HIGH",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-2",
    title: "Fazer exercícios",
    categoryId: "2",
    category: {
      id: "2",
      name: "Saúde",
      icon: "heart",
      color: "green"
    },
    startDate: getDateDaysAgo(0),
    estimatedDuration: 60,
    annotation: "30 min cardio + 30 min musculação",
    tagIds: ["1", "4"],
    tags: [
      { id: "1", name: "autocuidado", color: "purple" },
      { id: "4", name: "saúde", color: "red" }
    ],
    status: "PENDING",
    priority: "MEDIUM",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-3",
    title: "Revisar orçamento mensal",
    categoryId: "1",
    category: {
      id: "1",
      name: "Finanças",
      icon: "dollar-sign",
      color: "amber"
    },
    startDate: getDateDaysAgo(0),
    dueDate: getDateDaysAhead(1),
    estimatedDuration: 45,
    annotation: "Revisar gastos e definir metas para o próximo mês",
    tagIds: ["5", "6"],
    tags: [
      { id: "5", name: "finanças", color: "yellow" },
      { id: "6", name: "relacionamento", color: "pink" }
    ],
    status: "COMPLETED",
    priority: "HIGH",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-4",
    title: "Ler capítulo 5 do livro sobre design patterns",
    categoryId: "5",
    category: {
      id: "5",
      name: "Estudos",
      icon: "book",
      color: "orange"
    },
    startDate: getDateDaysAhead(1),
    dueDate: getDateDaysAhead(3),
    startDateTime: "20:00",
    dueDateTime: "21:30",
    estimatedDuration: 90,
    annotation: "Fazer anotações dos principais conceitos e exemplos",
    tagIds: ["2"],
    tags: [
      { id: "2", name: "trabalho", color: "blue" }
    ],
    status: "PENDING",
    priority: "MEDIUM",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "task-5",
    title: "Meditar",
    categoryId: "4",
    category: {
      id: "4",
      name: "Pessoal",
      icon: "user",
      color: "purple"
    },
    startDate: getDateDaysAgo(0),
    estimatedDuration: 15,
    annotation: "Meditação mindfulness - foco na respiração",
    tagIds: ["1"],
    tags: [
      { id: "1", name: "autocuidado", color: "purple" }
    ],
    status: "PENDING",
    priority: "LOW",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];