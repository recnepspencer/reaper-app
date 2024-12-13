import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { User } from "@/lib/interfaces/user.interface";

export async function GET() {
  try {
    const users: User[] = await prisma.user.findMany(); // Fetch all users
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}