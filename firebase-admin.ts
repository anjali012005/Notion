import {
    initializeApp,
    getApps,
    App,
    getApp,
    cert
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

// import serviceKey  from "@/service_key.json";
// import serviceKey from "./service_key.json"; // JSON import issue fix


let app : App;

if(getApps().length === 0){
    app = initializeApp({
        credential: cert({projectId: process.env.NEXT_PUBLIC_PROJECT_ID, privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY, clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL}),
    });
}else{
    app = getApp();
}

const adminDb = getFirestore(app);

export {app as adminApp, adminDb};