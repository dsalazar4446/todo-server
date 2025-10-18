import express from "express";
import cors from "cors";
// import userRoutes from "./user.routes";
// import taskRoutes from "./task.routes";

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/users", userRoutes);
// app.use("/tasks", taskRoutes);

app.get("/", (_, res) => res.send("API running"));
app.listen(4000, () => console.log("Server on port 4000"));
