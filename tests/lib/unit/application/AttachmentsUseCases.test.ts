import { InMemoryTaskRepository } from "./helpers/InMemoryTaskRepository";
import { UploadAttachment } from "../../../../src/lib/Attachment/application/useCases/UploadAttachment";
import { DeleteAttachment } from "../../../../src/lib/Attachment/application/useCases/DeleteAttachment";
import { Task } from "../../../../src/lib/Task/domain/Task";

describe("[UseCase] Attachments", () => {
  const fakeStorage = {
    upload: jest.fn(async (_file: any) => ({
      url: "https://fake/url",
      name: "x.txt",
    })),
    delete: jest.fn(async (_name: string) => undefined),
  };

  it("sube y asocia un adjunto", async () => {
    const repo = new InMemoryTaskRepository();
    const t = Task.create({
      title: "A",
      description: "B",
      userEmail: "u@mail.com",
    });
    await repo.save(t);

    const uc = new UploadAttachment(repo as any, fakeStorage as any);
    const file = {
      originalname: "x.txt",
      buffer: Buffer.from("hi"),
      mimetype: "text/plain",
      size: 2,
    } as any;
    const att = await uc.execute("t-1", file);

    expect(att.name).toBe("x.txt");
    const saved = await repo.findById("t-1");
    expect(saved?.toPrimitives().attachments[0].name).toBe("x.txt");
  });

  it("elimina adjunto", async () => {
    const repo = new InMemoryTaskRepository();
    const t = Task.create({
      title: "A",
      description: "B",
      userEmail: "u@mail.com",
    })
    t.addAttachment({
      url: "https://fake/url",
      name: "y.txt",
    });
    await repo.save(t);

    const uc = new DeleteAttachment(repo as any, fakeStorage as any);
    await uc.execute("t-1", "y.txt");

    const saved = await repo.findById("t-1");
    expect(saved?.toPrimitives().attachments).toHaveLength(0);
  });
});
