// import RoomProvider from '@/components/RoomProvider';
// import { auth, currentUser } from '@clerk/nextjs/server';
// import React from 'react'
// import { LayoutProps } from 'next';

// const DocLayout = async({ children, params: { id } }: { children: React.ReactNode; params: { id: string } }) =>{
//     const user =  await currentUser(); // Get user details properly

//     console.log("User Data:", user);
//     const { sessionClaims, userId } = await auth();

//     if (!userId) {
//         throw new Error("Unauthorized: No user found");
//     }

//     const userEmail = sessionClaims?.email;

//     if (!userEmail) {
//         throw new Error("Error: User email is undefined");
//     }

//     console.log("Session Email:", sessionClaims?.email);
//     return (
//         <RoomProvider roomId={params.id}>
//             {children}
//         </RoomProvider>
//     )
// }

// export default DocLayout

import RoomProvider from '@/components/RoomProvider';
import { ReactNode } from 'react';

// ✅ Correctly define `params` inside a separate type
interface DocLayoutProps {
    children: ReactNode;
    params: Promise<{ id: string }>; // 👈 Fix the Promise issue
}

// ✅ Make function `async` to handle `params` properly
const DocLayout = async ({ children, params }: DocLayoutProps) => {
    const resolvedParams = await params; // 👈 Await the params correctly

    return (
        <RoomProvider roomId={resolvedParams.id}>
            {children}
        </RoomProvider>
    );
};

export default DocLayout;
