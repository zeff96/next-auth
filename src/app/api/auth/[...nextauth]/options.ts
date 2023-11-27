import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'Email'},
        password: {label: 'Password', type: 'password', placeholder: "Password"}
      },
      async authorize(credentials, req){
        const res = await fetch('http:localhost:3000/api/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        })

        const user = await res.json()

        if(res.ok && user) {
          return user
        }else {
          return null
        }
      }
    })
  ]
}