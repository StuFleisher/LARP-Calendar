/*
  Warnings:

  - You are about to drop the column `userId` on the `organizations` table. All the data in the column will be lost.
  - Made the column `username` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_userId_fkey";

-- DropIndex
DROP INDEX "organizations_userId_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "userId",
ALTER COLUMN "username" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
