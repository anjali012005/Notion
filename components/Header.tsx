'use client'

// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
// import { useUser } from "@clerk/nextjs"
// import './Header.css'

// const Header = () => {
//   const {user} = useUser();
//   console.log("User Data:", user);
//   // console.log("isSignedIn:", isSignedIn);
//   return (
//     <div className="user">
//       {user && (
//         <h1>
//           {user?.firstName}
//           {`'s`} Space
//         </h1>
//       )}


//       {/* Breadcrums */}

//       <div>
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>

//         <SignedIn>
//           <UserButton/>
//         </SignedIn>
//       </div>
//     </div>
//   )
// }

// export default Header

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import "./Header.css";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  console.log("User Data:", user);
  console.log("isSignedIn:", isSignedIn);
  console.log("isLoaded:", isLoaded);

  if (!isLoaded) {
    return <p>Loading authentication...</p>;
  }

  return (
    <div className="user">
      {isSignedIn ? <h1>{user?.firstName || "User"}'s Space</h1> : <h1>Welcome!</h1>}


      {/* Breadcrumbs */}
      <Breadcrumbs/>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;

