import bcrypt from 'bcrypt'
import {string, z} from 'zod'
import jwt from "jsonwebtoken"
import { pool } from '@/db/db'

const loginUser = async(prevState: any, formData: FormData) => {

  const schema = z.object({
    email: string(),
    password: string()
  })

  const user = schema.parse({
    email: formData.get('email'),
    password: formData.get('password')
  })
}