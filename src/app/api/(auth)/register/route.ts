import { hash } from "argon2";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/valiadations/auth";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid Input",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    const normaliseEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normaliseEmail,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "Account with this email already exists",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: normaliseEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account Created successfully",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Registration Error", error);

    return NextResponse.json(
      {
        message: "Something went wrong while registring a user",
      },
      {
        status: 500,
      },
    );
  }
}
