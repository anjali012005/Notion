"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export async function createNewDocument() {

    // const authData = auth(); // Use auth() directly
    // console.log("Session Data:", authData);
    const user = await currentUser(); // Get user details properly

    console.log("User Data:", user);
    const { sessionClaims, userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: No user found");
    }

    const userEmail = sessionClaims?.email;

    if (!userEmail) {
        throw new Error("Error: User email is undefined");
    }


    // const { sessionClaims } = await auth();


    console.log("Session Email:", sessionClaims?.email);


    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Doc"
    })

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
    })

    return { docId: docRef.id };

}
