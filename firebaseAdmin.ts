import { getApps } from "firebase-admin/app";
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
