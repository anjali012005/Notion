import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDzw-EOjMmd5lrBU7KCOLLfdNSCscTmeN8",
    authDomain: "notion-clone-2-b0dab.firebaseapp.com",
    projectId: "notion-clone-2-b0dab",
    storageBucket: "notion-clone-2-b0dab.firebasestorage.app",
    messagingSenderId: "206754981736",
    appId: "1:206754981736:web:9da6ac43c8029513c3d8dd"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export {db};