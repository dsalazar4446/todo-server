export class TaskTag {
  private readonly value: string;

  constructor(value: string) {
    const trimmed = value.trim();
    if (!trimmed) throw new Error("Tag cannot be empty");
    if (trimmed.length > 30) throw new Error("Tag too long (max 30 chars)");
    this.value = trimmed.toLowerCase();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: TaskTag): boolean {
    return this.value === other.getValue();
  }

  public static fromPrimitives(values: string[]): TaskTag[] {
    return values.map((v) => new TaskTag(v));
  }

  public static toPrimitives(tags: TaskTag[]): string[] {
    return tags.map((t) => t.getValue());
  }
}
