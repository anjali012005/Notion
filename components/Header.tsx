'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { useUser } from "@clerk/nextjs"
import './Header.css'

const Header = () => {
  const {user} = useUser()
  return (
    <div className="user">
      {user && (
        <h1>
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}


      {/* Breadcrums */}

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </div>
  )
}

export default Header
