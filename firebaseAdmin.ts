import { getApps } from "firebase-admin/app";
const admin = require("firebase-admin");
const serviceAccount = require("./ghauri-medics-f36e5-firebase-adminsdk-wni9u-f791c15cef.json");

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
