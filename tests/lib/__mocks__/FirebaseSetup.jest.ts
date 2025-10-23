jest.setTimeout(20000);
jest.mock("firebase-admin", () => {
  const fn = () => ({});
  return {
    __esModule: true,
    default: {
      apps: [{}],
      initializeApp: jest.fn(),
      credential: { cert: jest.fn(), applicationDefault: jest.fn() },
      auth: fn,
      firestore: () => ({}),
    },
    apps: [{}],
    initializeApp: jest.fn(),
    credential: { cert: jest.fn(), applicationDefault: jest.fn() },
    auth: fn,
    firestore: () => ({}),
  };
});
