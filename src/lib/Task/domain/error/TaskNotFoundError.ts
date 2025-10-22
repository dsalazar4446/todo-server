import { DomainError } from "../../../../lib/Common/infrastructure/error";

export class TaskNotFoundError extends DomainError {
  constructor(taskId: string) {
    super(`Task with id '${taskId}' was not found`, "TaskDomain");
  }
}
