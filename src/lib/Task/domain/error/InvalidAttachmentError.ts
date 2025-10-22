import { DomainError } from "../../../../lib/Common/infrastructure/error";


export class InvalidAttachmentError extends DomainError {
  constructor(reason: string) {
    super(`Invalid attachment: ${reason}`, "TaskDomain");
  }
}