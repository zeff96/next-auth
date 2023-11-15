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

  const selectQuery = await pool.query('SELECT email, hashed_password FROM users WHERE email = $1', [user.email])

  if(selectQuery.rows.length === 0) return {message: 'Invalid credentials. Try again!'}

  const success = bcrypt.compareSync(selectQuery.rows[0]['hashed_password'], user.password)

  if(!success) return {message: 'Invalid credentials. Try again!'}
}