import type { Task } from "../../domain";

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>;
  findByUser(email: string): Promise<Task[]>;
  listCompleted(email: string): Promise<Task[]>;
  listPending(email: string): Promise<Task[]>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}
