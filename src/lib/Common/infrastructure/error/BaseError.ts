export abstract class BaseError extends Error {
  public override readonly name: string;
  public override readonly message: string = "";
  public override readonly stack?: string;
  public readonly statusCode: number;
  public readonly context?: string;


  constructor(message: string, statusCode = 500, context?: string, stack?: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.context = context;
    this.stack = stack

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      context: this.context,
      stack: this.stack,
    };
  }
}
