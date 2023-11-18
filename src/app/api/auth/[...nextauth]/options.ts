import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { pool } from "@/db/db";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in with email and password',
      credentials: {
        email: {label: 'Email', type: 'email', placeholder: 'Email'},
        password: {label: 'Password', type: 'password', placeholder: "Password"}
      },
      async authorize(credentials, req){
        const result = await pool.query('SELECT id, username, email FROM users WHERE email = $1', [credentials?.email])

        const user = result.rows[0]

        const res = bcrypt.compareSync(credentials?.password, user?.password)

        if(res && user) {
          return user
        }else {
          return null
        }
      }
    })
  ]
}