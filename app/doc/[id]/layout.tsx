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
import { auth } from '@clerk/nextjs/server';
import { ReactNode } from 'react';

// Define the correct type to avoid 'Promise' issue
interface DocLayoutProps {
    children: ReactNode;
    params: { id: string }; // Ensure 'params' is correctly typed
}

// Remove `async` from function declaration
const DocLayout = ({ children, params }: DocLayoutProps) => {
    // Auth needs to be handled in a useEffect or server action (Next.js restriction)
    return (
        <RoomProvider roomId={params.id}>
            {children}
        </RoomProvider>
    );
};

export default DocLayout;
