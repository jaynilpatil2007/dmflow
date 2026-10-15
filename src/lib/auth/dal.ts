import "server-only";

import { cookies } from "next/headers";
import { hashSessionToken } from "./sessions";
import { prisma } from "../prisma";

const SESSION_KEY = "dmflow_session";

export async function getCurrentUser() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(SESSION_KEY)?.value;
  if (!token) return null;

  const tokenHash = hashSessionToken(token);

  const session = await prisma.sessions.findUnique({
    where: {
      tokenHash,
    },
    select: {
      expiresAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      },
    },
  });

  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    await prisma.sessions.delete({
      where: {
        tokenHash,
      },
    });

    return null;
  }

  return session.user;
}
