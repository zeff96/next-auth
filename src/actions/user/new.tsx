"use server"

import { pool } from "@/db/db"
import bcrypt from 'bcrypt'
import { z } from "zod"

export const registration = async(prevState: any, formData: FormData) => {

  const schema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })

  const user = schema.parse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('password_confirmation')
  })

  const selectQuery = await pool.query('SELECT email FROM users WHERE email = $1', [user.email])

  if(selectQuery.rows.length > 0) return {message: 'Email already exist!'}

  if(user.passwordConfirmation !== user.password) return {message: 'Password do not match!'}

  const saltRounds = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(user.password, saltRounds)

  const insertQuery = {
    text: "INSERT INTO users(username, email, hashed_password) VALUES($1, $2, $3)",
    values: [user.username, user.email, hashedPassword]
  }

  try {
    await pool.query(insertQuery)
  } catch (error) {
    return {message: error}
  }

}