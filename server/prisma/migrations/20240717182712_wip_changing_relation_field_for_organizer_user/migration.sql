/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_username_key" ON "organizations"("username");
