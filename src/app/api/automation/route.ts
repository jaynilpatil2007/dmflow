import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/dal";
import { createAutomationSchema } from "@/lib/valiadations/automation";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorised",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();
    const parsedData = createAutomationSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Invalid Input",
          error: parsedData.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const { name, triggeredKeyword, replyMessage, instagramAccountId } =
      parsedData.data;

    const account = await prisma.instagramAccount.findFirst({
      where: {
        id: instagramAccountId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!account) {
      return NextResponse.json(
        {
          message: "Instagram Account not found",
        },
        {
          status: 404,
        },
      );
    }

    const automation = await prisma.automation.create({
      data: {
        name,
        triggeredKeyword,
        replyMessage,
        instagramAccountId: account.id,
      },
    });

    return NextResponse.json(
      {
        message: "Automaiton created",
        automation,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Automation error:", error);

    return NextResponse.json(
      {
        message: "Failed to create Automation",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "Uauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const automation = await prisma.automation.findFirst({
      where: {
        instagramAccount: {
          userId: user.id,
        },
      },
      include: {
        instagramAccount: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ automation });
  } catch (error) {
    console.log("GET request Automation failed:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch the Automation request",
      },
      {
        status: 500,
      },
    );
  }
}
