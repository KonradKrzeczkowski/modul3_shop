import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  if (!email && !phone) {
    return NextResponse.json({ exists: false });
  }


  let emailExists = false;
  if (email) {
    const emailUser = await prisma.user.findUnique({
      where: { email },
    });
    emailExists = !!emailUser;
  }


  let phoneExists = false;
  if (phone) {
    const phoneUser = await prisma.user.findUnique({
      where: { phone },
    });
    phoneExists = !!phoneUser;
  }

  return NextResponse.json({
    emailExists,
    phoneExists,
    exists: emailExists || phoneExists, 
  });
}