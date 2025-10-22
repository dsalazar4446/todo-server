import { BaseError } from "./BaseError";

export abstract class ApplicationError extends BaseError {
  constructor(message: string, context?: string) {
    super(message, 400, context);
  }
}
