jest.mock("../../src/lib/Shared/Infra/firebaseApp", () => {
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
