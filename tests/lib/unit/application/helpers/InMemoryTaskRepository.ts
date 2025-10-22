import { Task } from "../../../../../src/lib/Task/domain/Task";
import { ITaskRepository } from "../../../../../src/lib/Task/application/repositories/ITaskRepository";

export class InMemoryTaskRepository implements ITaskRepository {
  private store = new Map<string, Task>();

  async findById(id: string): Promise<Task | null> {
    return this.store.get(id) ?? null;
  }
  async findByUser(email: string): Promise<Task[]> {
    return Array.from(this.store.values()).filter(
      (t) => t.getUserEmail().getValue() === email
    );
  }
  async listCompleted(email: string): Promise<Task[]> {
    return (await this.findByUser(email)).filter(
      (t) => t.getStatus().isCompleted()
    );
  }
  async listPending(email: string): Promise<Task[]> {
    return (await this.findByUser(email)).filter(
      (t) => !t.getStatus().isCompleted()
    );
  }
  async save(task: Task): Promise<void> {
    this.store.set(task.getId().getValue(), task);
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
