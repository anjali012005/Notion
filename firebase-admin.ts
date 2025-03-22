import {
    initializeApp,
    getApps,
    App,
    getApp,
    cert, ServiceAccount
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

// import serviceKey  from "@/service_key.json";
// import serviceKey from "./service_key.json";
// JSON import issue fix
// const serviceKey = require("./service_key.json");

const serviceKey = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey as ServiceAccount),
    });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };