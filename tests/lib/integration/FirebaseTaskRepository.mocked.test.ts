import { FirebaseTaskRepository } from "../../../src/lib/Task/infrastructure/FirebaseTaskRepository";
import { Task } from "../../../src/lib/Task/domain/Task";

jest.mock("../../../src/lib/Common/infrastructure/firebase/firebaseApp.ts", () => {
  const map = new Map<string, any>();
  const makeDoc = (id: string) => ({
    id,
    data: () => map.get(id),
    exists: map.has(id),
  });
  const col = {
    _name: "tasks",
    doc(id: string) {
      return {
        async get() {
          return makeDoc(id);
        },
        async set(data: any) {
          map.set(id, data);
        },
        async delete() {
          map.delete(id);
        },
      };
    },
    where(field: string, _op: string, value: any) {
      return {
        async get() {
          const docs = Array.from(map.entries())
            .filter(([, d]) => d[field] === value)
            .map(([id, d]) => ({ id, data: () => d }));
          return { docs };
        },
      };
    },
  };
  return { firestore: { collection: (_: string) => col } };
});

describe("[Integration] FirebaseTaskRepository (mocked)", () => {
  const repo = new FirebaseTaskRepository();

  it("save → findById", async () => {
    const t = Task.create({
      title: "I",
      description: "Desc",
      userEmail: "i@mail.com",
    });

    await repo.save(t);
    const found = await repo.findById("i-1");
    expect(found?.getTitle().getValue()).toBe("I");
  });

  it("findByUser / listCompletedByUser / listPendingByUser", async () => {
   
    await repo.save(Task.create({
      title: "A",
      description: "D",
      userEmail: "u@mail.com",
    }));
    
    await repo.save(
      Task.create({
        title: "B",
        description: "B",
        userEmail: "u@mail.com",
      })
    );

    const all = await repo.findByUser("u@mail.com");
    const completed = await repo.listCompleted("u@mail.com");
    const pending = await repo.listPending("u@mail.com");

    expect(all).toHaveLength(2);
    expect(completed).toHaveLength(1);
    expect(pending).toHaveLength(1);
  });

  it("delete", async () => {
    const task = Task.create({
      title: "Del",
      description: "D",
      userEmail: "d@mail.com",
    });
     await repo.save(
      Task.create({
        title: "Del",
        description: "D",
        userEmail: "d@mail.com",
      })
    );
    await repo.delete(task.getId().getValue());
    const found = await repo.findById(task.getId().getValue());
    expect(found).toBeNull();
  });
});
