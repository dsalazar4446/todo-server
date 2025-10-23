import dotenv from "dotenv";
import path from "path";
import { defineInt, defineString } from "firebase-functions/params";
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

const PARAMS = {
  FIREBASE_STORAGE_BUCKET: defineString("FIREBASE_STORAGE_BUCKET"),
  FIREBASE_PROJECT_ID: defineString("FIREBASE_PROJECT_ID"),
  JWT_SECRET: defineString("JWT_SECRET"),
  JWT_EXPIRES_IN: defineString("JWT_EXPIRES_IN"),
  NODE_ENV: defineString("NODE_ENV"),
  PORT: defineInt("PORT"),
  PREFIX: defineString("PREFIX"),
};
export const config = {
  firebase: {
    bucket:
      process.env.FIREBASE_STORAGE_BUCKET ||
      tryGet(() => PARAMS.FIREBASE_STORAGE_BUCKET.value(), ""),
    firebaseKeyPath: process.env.FIREBASE_KEY_PATH || "",
    projectId:
      process.env.FIREBASE_PROJECT_ID ||
      tryGet(() => PARAMS.FIREBASE_PROJECT_ID.value(), ""),
  },
  jwt: {
    secret:
      process.env.JWT_SECRET || tryGet(() => PARAMS.JWT_SECRET.value(), ""),
    expireIn:
      process.env.JWT_EXPIRES_IN ||
      tryGet(() => PARAMS.JWT_EXPIRES_IN.value(), "1h"),
  },
  port: process.env.PORT || tryGet(() => PARAMS.PORT.value(), 4000),
  prefix: process.env.PREFIX || tryGet(() => PARAMS.PREFIX.value(), "/api"),
  production:
    process.env.NODE_ENV === "production" ||
    tryGet(() => PARAMS.NODE_ENV.value(), "") === "production",
};


function tryGet<T>(getter: () => T, fallback: T): T {
  try {
    return getter() ?? fallback;
  } catch {
    return fallback;
  }
}