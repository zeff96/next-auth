import bcrypt from 'bcrypt'
import {z} from 'zod'
import jwt from "jsonwebtoken"
import {cookies} from 'next/headers'
import { pool } from '@/db/db'

const loginUser = async(prevState: any, formData: FormData) => {

  const schema = z.object({
    email: z.string(),
    password: z.string()
  })

  const user = schema.parse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  const selectQuery = await pool.query('SELECT email, hashed_password FROM users WHERE email = $1', [user.email])

  if(selectQuery.rows.length === 0) return {message: 'Invalid credentials. Try again!'}

  const success = bcrypt.compareSync(selectQuery.rows[0]['hashed_password'], user.password)

  if(!success) return {message: 'Invalid credentials. Try again!'}

  await pool.query('UPDATE users SET last_login_date = $1 WHERE email = $2', [new Date, user.email])

  const result = await pool.query('SELECT id, username, email FROM users WHERE email = $1', [user.email])

  const token = jwt.sign({id: result.rows[0].id, username: result.rows[0].username, email: result.rows[0].email}, 'secret', {expiresIn: "1hr"})

  cookies().set({
    name: 'user',
    value: token,
    httpOnly: true,
    secure: true,
    expires: Date.now() + 24 * 60 * 60 * 1000
  })
}

export default loginUser