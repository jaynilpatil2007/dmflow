import { getCurrentUser } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { updateAutomationSchema } from "@/lib/valiadations/automation";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: number }>;
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const parsedData = updateAutomationSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Invalid Input",
          error: parsedData.error?.flatten(),
        },
        {
          status: 401,
        },
      );
    }

    const existing = await prisma.automation.findFirst({
      where: {
        id,
        instagramAccount: {
          userId: user.id,
        },
      },
      select: {
        id: true,
      },
    });
    if (!existing) {
      return NextResponse.json(
        {
          message: "Automation not found",
        },
        {
          status: 404,
        },
      );
    }

    const updatedAutomation = await prisma.automation.update({
      where: {
        id: existing.id,
      },
      data: parsedData.data,
    });

    return NextResponse.json(
      {
        message: "Automation Updated",
        updatedAutomation,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Update Automation Error:", error);

    return NextResponse.json(
      {
        message: "Failed to update automation",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const result = await prisma.automation.deleteMany({
      where: {
        id,
        instagramAccount: {
          userId: user.id,
        },
      },
    });

    if (result.count === 0) {
      return NextResponse.json({
        message: "Automation not found",
      });
    }

    return NextResponse.json({
      message: "Automation Delete",
    });
  } catch (error) {
    console.log("Delete Automation error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete the automation",
      },
      {
        status: 500,
      },
    );
  }
}
