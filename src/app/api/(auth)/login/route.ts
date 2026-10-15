import { createSessions } from "@/lib/auth/sessions";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/valiadations/auth";
import { verify } from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid Input",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email and password",
        },
        {
          status: 401,
        },
      );
    }

    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Incorrect Password",
        },
        {
          status: 401,
        },
      );
    }

    await createSessions(user.id);

    return NextResponse.json(
      {
        message: "Login Successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Login Error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while login",
      },
      {
        status: 500,
      },
    );
  }
}
