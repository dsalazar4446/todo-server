import admin from 'firebase-admin';
import serviceAccount from "../../../../../task-manager-60b8c-firebase-adminsdk-fbsvc-6ecf251fab.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();