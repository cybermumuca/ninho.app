export interface Task {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  notes: string | null;
  date: string;
  dueDate: string | null;
  estimatedDuration: string | null; // hh:mm:ss
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  completedAt: string | null;
}

export interface CreateTaskRequest {
  title: string;
  categoryId: string;
  startDate: string;
  dueDate?: string;
  startDateTime?: string;
  dueDateTime?: string;
  estimatedDuration?: number;
  annotation?: string;
  tagIds: string[];
}