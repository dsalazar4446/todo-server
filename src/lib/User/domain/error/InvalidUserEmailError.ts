import { DomainError } from "../../../../lib/Common/infrastructure/error";

export class InvalidUserEmailError extends DomainError {
  constructor(email: string) {
    super(`Invalid email format: ${email}`, "UserDomain");
  }
}
