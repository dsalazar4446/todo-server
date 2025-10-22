export class TaskAttachment {
  private readonly url: string;
  private readonly name: string;

  constructor(params: { url: string; name: string }) {
    if (!params.url.startsWith("http"))
      throw new Error("Attachment URL must be valid");
    if (!params.name.trim()) throw new Error("Attachment name is required");
    this.url = params.url;
    this.name = params.name;
  }

  public getUrl(): string {
    return this.url;
  }

  public getName(): string {
    return this.name;
  }

  public static fromPrimitives(data: any[]): TaskAttachment[] {
    return data.map((d) => new TaskAttachment(d));
  }

  public static toPrimitives(attachments: TaskAttachment[]): any[] {
    return attachments.map((a) => ({ url: a.url, name: a.name }));
  }
}
