"use client"

import {useSession, signIn, signOut} from 'next-auth/react'

export default function Home() {
  const{data: session, status} = useSession()

  if(status === 'authenticated') {
    return (
      <div>
        <p>Signed in as {session.user?.name}</p>
        <button type="button" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return <button type="button" onClick={() => signIn()}>Sign in</button>
}
