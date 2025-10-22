import admin from "firebase-admin";
import { firebaseInit } from "./config";


firebaseInit();
admin.firestore().settings({ databaseId: "task-manager" });
export const firestore = admin.firestore();
export const auth = admin.auth();
export const bucket = admin.storage().bucket();


export function checkFirebaseStatus() {
    
  return {
    apps: admin.apps.length,
    projectId: admin.app().options.projectId || "none",
    storageBucket: admin.app().options.storageBucket || "none",
  };
}