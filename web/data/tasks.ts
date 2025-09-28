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
    category: {
      id: "5",
      name: "Estudos",
      icon: "book",
      color: "orange"
    },
    date: getDateDaysAgo(1),
    dueDate: getDateDaysAhead(2),
    estimatedDuration: "02:00:00",
    notes: "Focar nos padrões render props e compound components",
    tags: [
      { id: "2", name: "trabalho", color: "blue" },
      { id: "5", name: "finanças", color: "yellow" }
    ],
    status: "IN_PROGRESS",
    completedAt: null
  },
  {
    id: "task-2",
    title: "Fazer exercícios",
    category: {
      id: "2",
      name: "Saúde",
      icon: "heart-pulse",
      color: "green"
    },
    date: getDateDaysAgo(0),
    estimatedDuration: "01:00:00",
    notes: "30 min cardio + 30 min musculação",
    tags: [
      { id: "1", name: "autocuidado", color: "purple" },
      { id: "4", name: "saúde", color: "red" }
    ],
    status: "PENDING",
    dueDate: null,
    completedAt: null
  },
  {
    id: "task-3",
    title: "Revisar orçamento mensal",
    category: {
      id: "1",
      name: "Finanças",
      icon: "dollar-sign",
      color: "amber"
    },
    date: getDateDaysAgo(0),
    dueDate: getDateDaysAhead(1),
    estimatedDuration: "00:45:00",
    notes: "Revisar gastos e definir metas para o próximo mês",
    tags: [
      { id: "5", name: "finanças", color: "yellow" },
      { id: "6", name: "relacionamento", color: "pink" }
    ],
    status: "COMPLETED",
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-4",
    title: "Ler capítulo 5 do livro sobre design patterns",
    category: {
      id: "5",
      name: "Estudos",
      icon: "book",
      color: "orange"
    },
    date: getDateDaysAhead(1),
    dueDate: getDateDaysAhead(3),
    estimatedDuration: "01:30:00",
    notes: "Fazer anotações dos principais conceitos e exemplos",
    tags: [
      { id: "2", name: "trabalho", color: "blue" }
    ],
    status: "PENDING",
    completedAt: null
  },
  {
    id: "task-5",
    title: "Meditar",
    category: {
      id: "4",
      name: "Pessoal",
      icon: "brain",
      color: "purple"
    },
    date: getDateDaysAgo(0),
    estimatedDuration: "00:15:00",
    notes: "Meditação mindfulness - foco na respiração",
    tags: [
      { id: "1", name: "autocuidado", color: "purple" }
    ],
    status: "PENDING",
    dueDate: null,
    completedAt: null
  }
];