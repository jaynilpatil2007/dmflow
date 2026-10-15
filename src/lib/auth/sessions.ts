import { prisma } from "../prisma";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;
const SESSION_KEY = "dmflow_session";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSessions(userId: number) {
  const token = randomBytes(12).toString("hex");
  const tokenHash = hashToken(token);

  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await prisma.sessions.create({
    data: {
      tokenHash,
      userId,
      expiresAt,
    },
  });

  const cookiesStore = await cookies();

  cookiesStore.set(SESSION_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function revokeSession() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(SESSION_KEY)?.value;

  if (token) {
    const tokenHash = hashToken(token);

    await prisma.sessions.deleteMany({
      where: {
        tokenHash,
      },
    });
  }

  cookiesStore.delete(SESSION_KEY);
}

export async function deleteSessionKey() {
  const cookiesStore = await cookies();

  cookiesStore.delete(SESSION_KEY);
}

export function hashSessionToken(token: string) {
  return hashToken(token);
}
