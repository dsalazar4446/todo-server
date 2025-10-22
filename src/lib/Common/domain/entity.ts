export abstract class Entity<T> {
  protected readonly _id: string | undefined;

  constructor(id?: string) {
    this._id = id;
  }

  get id(): string | undefined {
    return this._id;
  }

  abstract toJSON(): T;
}
