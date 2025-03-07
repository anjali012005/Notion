import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET() {
    const session = auth();
    const user = await currentUser();

    console.log("Session Data:", session);
    console.log("User Data:", user);

    return NextResponse.json({ session, user });
}
