import { BaseError } from "./BaseError";

export abstract class InfrastructureError extends BaseError {
  constructor(message: string, context?: string, stack?: string) {
    super(message, 500, context, stack);
  }
}
