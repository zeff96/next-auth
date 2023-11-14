"user server"

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
}