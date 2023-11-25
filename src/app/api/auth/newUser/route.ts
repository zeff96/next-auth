import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'

interface requestBody {
  name: string,
  email: string,
  password: string
}

export async function POST(request: Request) {
  const body: requestBody = await request.json()

  const user = prisma.user.create({
    data: {
      name: body.name,
      email: body?.email,
      password: await bcrypt.hash(body?.password, 10)
    }
  })

  const { password, ...result } = user

  return new Response(JSON.stringify(result))
}