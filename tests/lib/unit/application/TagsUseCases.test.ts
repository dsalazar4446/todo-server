import { InMemoryTaskRepository } from "./helpers/InMemoryTaskRepository";
import { Task } from "../../../../src/lib/Task/domain/Task";
import { AddTagToTask } from "../../../../src/lib/Task/application/useCases/AddTagToTask";
import { RemoveTagFromTask } from "../../../../src/lib/Task/application/useCases/RemoveTagFromTask";
import { TagAlreadyExistsError } from "../../../../src/lib/Task/domain/error";

describe("[UseCase] Tags", () => {
  it("agrega y remueve tags", async () => {
    const repo = new InMemoryTaskRepository();
    const t = Task.create({
      title: "A",
      description: "B",
      userEmail: "u@mail.com",
    });
    await repo.save(t)
    

    const add = new AddTagToTask(repo as any);
    await add.execute("t-1", "urgent");

    const afterAdd = await repo.findById("t-1");
    expect(afterAdd?.toPrimitives().tags).toContain("urgent");

    const rem = new RemoveTagFromTask(repo as any);
    await rem.execute("t-1", "urgent");

    const afterRem = await repo.findById("t-1");
    expect(afterRem?.toPrimitives().tags).not.toContain("urgent");
  });

  it("evita duplicados", async () => {
    const repo = new InMemoryTaskRepository();
    const t = Task.create({
      title: "A",
      description: "B",
      userEmail: "u@mail.com",
    });
    t.addTag?.("dup");
    await repo.save(t);

    const add = new AddTagToTask(repo as any);
    await expect(add.execute("t-1", "dup")).rejects.toBeInstanceOf(
      TagAlreadyExistsError
    );
  });
});
