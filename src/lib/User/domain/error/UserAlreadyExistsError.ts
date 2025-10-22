import { DomainError } from "../../../../lib/Common/infrastructure/error";

export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`User with email '${email}' already exists`, "UserDomain");
  }
}
