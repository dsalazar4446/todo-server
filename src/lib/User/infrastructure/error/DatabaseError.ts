import { InfrastructureError } from "../../../Common/infrastructure/error";

export class DatabaseError extends InfrastructureError {
  constructor(operation: string, reason?: string, stack?: string) {
    super(
      `Database operation failed: ${operation}${reason ? " - " + reason : ""}`,
      "Database",
      stack
    );
  }
}
