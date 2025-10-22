import dotenv from "dotenv";
import path from "path";

import fs from "fs";

dotenv.config({
  path: path.resolve(__dirname, "../../../../../.env"),
});
const secretsPath = path.resolve(__dirname, "../../../../../secrets.local.json");

if (fs.existsSync(secretsPath)) {
  const secrets = JSON.parse(fs.readFileSync(secretsPath, "utf8"));
  Object.entries(secrets).forEach(([key, value]) => {
    process.env[key] = String(value);
  });
  console.log(
    `[env] secrets.local.json loaded with ${Object.keys(secrets).length} keys`
  );
}

export const config = {
  firebase: {
    bucket : process.env.FIREBASE_STORAGE_BUCKET || "",
    firebaseKeyPath: process.env.FIREBASE_KEY_PATH || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expireIn: process.env.JWT_EXPIRES_IN || "1h",
  },
  port: process.env.PORT || 4000,
  prefix: process.env.PREFIX || "/api",
  production: process.env.NODE_ENV === "production",
  
};