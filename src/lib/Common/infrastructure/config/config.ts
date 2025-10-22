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

export const config = {
  firebase: {
    bucket : process.env.FIREBASE_STORAGE_BUCKET || defineString("FIREBASE_STORAGE_BUCKET").value() || "",
    firebaseKeyPath: process.env.FIREBASE_KEY_PATH || "",
    projectId: process.env.FIREBASE_PROJECT_ID || defineString("FIREBASE_PROJECT_ID").value() || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || defineString("JWT_SECRET").value() ||"",
    expireIn: process.env.JWT_EXPIRES_IN || defineString("JWT_EXPIRES_IN").value()|| "1h",
  },
  port: process.env.PORT || defineInt("PORT").value() ||4000,
  prefix: process.env.PREFIX || defineString("PREFIX").value() ||"/api",
  production: process.env.NODE_ENV === "production" || defineString("NODE_ENV").value() === "production",

  
};