import request from "supertest";
import { Server } from "../../../src/lib/Common/infrastructure/server/server";

let app: any;

beforeAll(() => {
  const server = new Server();
  // @ts-ignore accedemos a la instancia de express
  app = server["app"];
});

describe("[E2E] Tasks API", () => {
  it("POST /api/tasks crea una tarea", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        id: "e2e-1",
        title: "E2E",
        description: "Test",
        userEmail: "e2e@mail.com",
      });

    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(400);
  });

  it("PATCH /api/tasks/:id/toggle alterna estado", async () => {
    await request(app)
      .post("/api/tasks")
      .send({
        id: "e2e-2",
        title: "ToToggle",
        description: "",
        userEmail: "e2e@mail.com",
      });

    const res = await request(app).patch("/api/tasks/e2e-2/toggle").send();
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(400);
  });

  it("GET /api/tasks/user/:email lista las tareas de un usuario", async () => {
    const res = await request(app).get("/api/tasks/user/e2e@mail.com");
    expect([200, 204]).toContain(res.status);
  });
});
