import type { NextAuthOptions } from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
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
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60
  }
}