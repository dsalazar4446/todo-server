import { DomainError } from "../../../../lib/Common/infrastructure/error";
export class InvalidTaskStatusError extends DomainError {
  constructor(status: string) {
    super(`Invalid task status: ${status}`, "TaskDomain");
  }
}