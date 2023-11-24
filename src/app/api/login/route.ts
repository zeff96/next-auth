import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const body = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      email: body?.email
    }
  })

  if(user && (await bcrypt.compare(body?.password, user?.password))) {
    const {password, ...userWithouPass} = user
    return new Response(JSON.stringify(userWithouPass))
  }else {
    return new Response(JSON.stringify(null))
  }
}