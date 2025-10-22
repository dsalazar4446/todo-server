import { Task } from "../../../../src/lib/Task/domain/Task";
import { Attachment } from "../../../../src/lib/Attachment/domain/Attachment";
import { InvalidAttachmentError } from "../../../../src/lib/Attachment/domain/errors/InvalidAttachmentError";

describe("[Domain] Task", () => {
  const base = () => Task.create({ title: "Title", description: "Desc", userEmail: "user@mail.com" })
    
  it("toggle() debe alternar el estado completed", () => {
    const t = base();
    expect(t.getStatus().isCompleted).toBe(false);
    t.toggleStatus();
    expect(t.getStatus().isCompleted).toBe(true);
    t.toggleStatus();
    expect(t.getStatus().isCompleted).toBe(false);
  });

  it("addAttachment() agrega un adjunto válido", () => {
    const t = base();
    t.addAttachment(
      new Attachment(
        "https://x",
        "file.pdf",
        10,
        "application/pdf"
      ).toPrimitives()
    );
    expect(t.toPrimitives().attachments).toHaveLength(1);
    expect(t.toPrimitives().attachments[0].name).toBe("file.pdf");
  });

  it("addAttachment() rechaza nombre duplicado", () => {
    const t = base();
    const a = new Attachment(
      "https://x",
      "dup.txt",
      1,
      "text/plain"
    ).toPrimitives();
    t.addAttachment(a);
    expect(() => t.addAttachment(a)).toThrow(InvalidAttachmentError);
  });

  it("removeAttachment() quita por nombre", () => {
    const t = base();
    t.addAttachment(
      new Attachment("https://x", "a.txt", 1, "text/plain").toPrimitives()
    );
    t.removeAttachment("a.txt");
    expect(t.toPrimitives().attachments).toHaveLength(0);
  });

  it("removeAttachment() falla si no existe", () => {
    const t = base();
    expect(() => t.removeAttachment("missing.txt")).toThrow(
      InvalidAttachmentError
    );
  });

  it("toPrimitives()/fromPrimitives() son consistentes", () => {
    const t1 = base();
    t1.addAttachment(
      new Attachment("https://x", "a.txt", 1, "text/plain").toPrimitives()
    );
    const snap = t1.toPrimitives();
    const t2 = Task.fromPrimitives(snap);
    expect(t2.toPrimitives()).toEqual(snap);
  });
});
