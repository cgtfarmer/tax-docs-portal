import { Task } from '../models/task.ts';
import { TaskInput } from '../models/task-input.ts';

export class TaskMapper {

  public mapModelToInput(model: Task): TaskInput {
    return {
      id: model.id,
      clientId: model.clientId,
      accountantId: model.accountantId,
      title: model.title,
      task_description: model.task_description,
      task_status: model.task_status,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at
    };
  }
  
  public mapInputToModel(input: TaskInput): Task {
    return {
      id: input.id ?? '',
      clientId: input.clientId ?? '',
      accountantId: input.accountantId ?? '',
      title: input.title ?? '',
      task_description: input.task_description ?? '',
      task_status: input.task_status ?? "In Progress",
      created_at: input.created_at ?? '',
      updated_at: input.updated_at ?? null,
      deleted_at: input.deleted_at ?? null
    };
  }
}