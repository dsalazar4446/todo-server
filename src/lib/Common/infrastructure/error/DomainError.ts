import { BaseError } from "./BaseError";

export abstract class DomainError extends BaseError {
  constructor(message: string, context?: string) {
    super(message, 422, context);
  }
}
