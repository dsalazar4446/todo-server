import { DomainError } from "../../../../lib/Common/infrastructure/error";

export class TagAlreadyExistsError extends DomainError {
  constructor(tag: string) {
    super(`Tag '${tag}' already exists in this task`, "TaskDomain");
  }
}