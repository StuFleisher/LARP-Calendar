/*
  Warnings:

  - You are about to drop the column `organizer` on the `larps` table. All the data in the column will be lost.
  - You are about to drop the column `isOrganizer` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "larps" DROP CONSTRAINT "larps_organizer_fkey";

-- AlterTable
ALTER TABLE "larps" DROP COLUMN "organizer",
ADD COLUMN     "orgId" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isOrganizer";

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orgName" VARCHAR(100) NOT NULL,
    "org_url" VARCHAR(500) NOT NULL DEFAULT '',
    "img_url" VARCHAR(500) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "isApproved" BOOLEAN NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_userId_key" ON "organizations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- AddForeignKey
ALTER TABLE "larps" ADD CONSTRAINT "larps_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
