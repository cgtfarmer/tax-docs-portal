export type TaskStatus = "In Progress" | "Completed";

export interface TaskInput {
  id: string | undefined;

  clientId: string | undefined;

  accountantId: string | undefined;

  title: string | undefined;

  task_description: string | undefined;

  task_status: TaskStatus | undefined;

  created_at: string | undefined;

  updated_at: string | null;

  deleted_at: string | null;
}