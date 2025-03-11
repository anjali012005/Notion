"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
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

export async function deleteDocument(roomId: string) {
    const user = await currentUser(); // Get user details properly

    const { sessionClaims, userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: No user found");
    }

    const userEmail = sessionClaims?.email;

    if (!userEmail) {
        throw new Error("Error: User email is undefined");
    }

    console.log("deleteDocument", roomId);

    try {
        //delete the document reference itself
        await adminDb.collection("document").doc(roomId).delete();

        const query = await adminDb
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get();

        const batch = adminDb.batch();

        //delete the room references in the user's collection for every user in the room
        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        await liveblocks.deleteRoom(roomId);

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}


export async function inviteUserToDocument(roomId: string, email: string) {
    const user = await currentUser(); // Get user details properly

    const { sessionClaims, userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: No user found");
    }

    const userEmail = sessionClaims?.email;

    if (!userEmail) {
        throw new Error("Error: User email is undefined");
    }

    try {
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId,
            })
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}

export async function removeUserFromDocument(roomId: string, email: string) {
    const user = await currentUser(); // Get user details properly

    const { sessionClaims, userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized: No user found");
    }

    const userEmail = sessionClaims?.email;

    if (!userEmail) {
        throw new Error("Error: User email is undefined");
    }

    try {
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .delete();

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}