export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  startDate: string;
  dueDate?: string;
  startDateTime?: string;
  dueDateTime?: string;
  estimatedDuration?: number; // em minutos
  annotation?: string;
  tagIds: string[];
  tags?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
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