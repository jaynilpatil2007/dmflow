import { revokeSession } from "@/lib/auth/sessions";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await revokeSession();

    return NextResponse.json(
      {
        message: "Logout Successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("Logout Error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong while logout",
      },
      { status: 500 },
    );
  }
}
