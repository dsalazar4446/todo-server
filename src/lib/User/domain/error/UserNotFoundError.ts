import { DomainError } from "../../../../lib/Common/infrastructure/error";

export class UserNotFoundError extends DomainError {
  constructor(email: string) {
    super(`User with email '${email}' was not found`, "UserDomain");
  }
}