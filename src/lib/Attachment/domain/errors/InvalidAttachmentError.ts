import { DomainError } from "../../../Common/infrastructure/error";

export class InvalidAttachmentError extends DomainError {
  constructor(reason: string) {
    super(`Invalid attachment: ${reason}`, "AttachmentDomain");
  }
}
