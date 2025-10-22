export class Attachment {
  constructor(
    public readonly url: string,
    public readonly name: string,
    public readonly size: number,
    public readonly mimetype: string
  ) {
    if (!url || !name || size <= 0) {
      throw new Error("Invalid attachment metadata");
    }
  }

  toPrimitives() {
    return {
      url: this.url,
      name: this.name,
      size: this.size,
      mimetype: this.mimetype,
    };
  }

  static fromPrimitives(data: any): Attachment {
    return new Attachment(data.url, data.name, data.size, data.mimetype);
  }
}
