export type TaskStatus = "In Progress" | "Completed";

export interface Task {
  id: string;

  clientId: string;

  accountantId: string;

  title: string;

  task_description: string;

  task_status: TaskStatus;

  created_at: string;

  updated_at: string | null;

  deleted_at: string | null;
}