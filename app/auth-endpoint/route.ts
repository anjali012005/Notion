import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const user = await currentUser(); // Get user details properly

    console.log("User Data:", user);
    const { sessionClaims, userId } = await auth();
    const {room} = await req.json();

    if (!userId) {
        throw new Error("Unauthorized: No user found");
    }

    const userEmail = sessionClaims?.email;

    if (!userEmail) {
        throw new Error("Error: User email is undefined");
    }

    console.log("Session Email:", sessionClaims?.email);
    // const {sessionClaims} = await auth();

    const session = liveblocks.prepareSession(sessionClaims?.email!, {
        userInfo:{
            name: sessionClaims?.fullName!,
            email: sessionClaims?.email!,
            avatar: sessionClaims?.image!,
        },
    });

    const usersInRoom = await adminDb.collectionGroup("rooms").where("userId", "==", sessionClaims?.email).get();

    const userInRoom = usersInRoom.docs.find((doc)=> doc.id === room);

    if(userInRoom?.exists){
        session.allow(room, session.FULL_ACCESS);
        const {body, status} = await session.authorize();

        console.log("You are authorised!")

        return new Response(body, {status});
    }else{
        return NextResponse.json(
            {message: "You are not in this room"},
            {status: 403}
        );
    }
}