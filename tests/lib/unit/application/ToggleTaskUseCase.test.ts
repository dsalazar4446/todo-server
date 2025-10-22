import { InMemoryTaskRepository } from "./helpers/InMemoryTaskRepository";
import { ToggleTask } from "../../../../src/lib/Task/application/useCases/ToggleTask";
import { Task } from "../../../../src/lib/Task/domain/Task";

describe("[UseCase] ToggleTask", () => {
  it("alterna completed y guarda", async () => {
    const repo = new InMemoryTaskRepository();
    const task = Task.create({
      title: "A",
      description: "B",
      userEmail: "u@mail.com",
    })
    await repo.save(task);

    const uc = new ToggleTask(repo as any);
    await uc.execute("t-1");

    const updated = await repo.findById("t-1");
    expect(updated?.getStatus().isCompleted()).toBe(true);
  });
});
