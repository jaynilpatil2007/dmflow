-- CreateTable
CREATE TABLE "InstagramAccount" (
    "id" SERIAL NOT NULL,
    "instagramUserId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "encryptedAccessToken" TEXT NOT NULL,
    "tokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstagramAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Automation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "triggeredKeyword" TEXT NOT NULL,
    "replyMessage" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "instagramAccountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramAccount_instagramUserId_key" ON "InstagramAccount"("instagramUserId");

-- CreateIndex
CREATE INDEX "InstagramAccount_userId_idx" ON "InstagramAccount"("userId");

-- CreateIndex
CREATE INDEX "Automation_instagramAccountId_isActive_idx" ON "Automation"("instagramAccountId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Automation_triggeredKeyword_instagramAccountId_key" ON "Automation"("triggeredKeyword", "instagramAccountId");

-- AddForeignKey
ALTER TABLE "InstagramAccount" ADD CONSTRAINT "InstagramAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Automation" ADD CONSTRAINT "Automation_instagramAccountId_fkey" FOREIGN KEY ("instagramAccountId") REFERENCES "InstagramAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
