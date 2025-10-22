import admin, { ServiceAccount } from "firebase-admin";
import fs from "fs";
import path from "path";
import { config } from "../../../Common/infrastructure/config/config";

// ✅ Inicializa Firebase Admin una sola vez
export function firebaseInit(): void {
  if (admin.apps.length) {
    console.log("[Firebase] Already initialized");
    return;
  }

  const env = process.env.NODE_ENV ?? "development";
  console.log(`[Firebase] Initializing (${env})...`);

  if (env === "production") {
    
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: config.firebase.projectId,
      storageBucket: config.firebase.bucket,
    });
  } else {
    const keyPath = path.resolve(process.cwd(), config.firebase.firebaseKeyPath);
    if (!fs.existsSync(keyPath)) {
      throw new Error(`Service account key not found at: ${keyPath}`);
    }

    const raw = fs.readFileSync(keyPath, "utf8");
    
    const serviceAccount = JSON.parse(raw);
   
    
    // Corrige saltos de línea en private_key
     if (typeof serviceAccount.private_key === "string") {
       serviceAccount.private_key = serviceAccount.private_key.replace(
         /\\n/g,
         "\n"
       );
     }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      storageBucket: config.firebase.bucket,
      projectId: config.firebase.projectId,
      serviceAccountId: serviceAccount.client_id
    });
  }

  console.log("[Firebase] Initialized successfully ✅");
}

