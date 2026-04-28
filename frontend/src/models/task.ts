export type TaskStatus = "In Progress" | "In Review" | "Completed";

export interface Task {
  id: string;

  clientId: string;

  accountantId: string;

  title: string;

  description: string;

  taskStatus: TaskStatus;

  createdAt: string;

  updatedAt: string | null;

  deletedAt: string | null;
}