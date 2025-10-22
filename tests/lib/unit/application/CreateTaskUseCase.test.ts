import { InMemoryTaskRepository } from "./helpers/InMemoryTaskRepository";
import { CreateTask } from "../../../../src/lib/Task/application/useCases/CreateTask";
import { Task } from "../../../../src/lib/Task/domain/Task";

describe("[UseCase] CreateTask", () => {
  it("crea y persiste una tarea", async () => {
    const repo = new InMemoryTaskRepository();
    const task = new CreateTask(repo as any);
    await task.execute({
      title: "A",
      description: "B",
      userEmail: "u@mail.com",
    });
    const saved = await repo.findById("t-1");
    expect(saved).toBeInstanceOf(Task);
    expect(saved?.getTitle().getValue()).toBe("A");
  });
});
