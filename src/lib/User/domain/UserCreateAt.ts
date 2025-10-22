export class UserCreatedAt {
  private readonly value: Date;

  constructor(value?: Date | string) {
    if (value instanceof Date) {
      this.value = value;
    } else if (typeof value === "string") {
      const parsed = new Date(value);
      if (isNaN(parsed.getTime())) {
        throw new Error(`Invalid date string: ${value}`);
      }
      this.value = parsed;
    } else {
      this.value = new Date();
    }
  }

  public getValue(): Date {
    return this.value;
  }

  public toISOString(): string {
    return this.value.toISOString();
  }

  public isBefore(other: UserCreatedAt): boolean {
    return this.value.getTime() < other.getValue().getTime();
  }
}
