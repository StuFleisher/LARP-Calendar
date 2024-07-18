/*
  Warnings:

  - Made the column `orgId` on table `larps` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "larps" DROP CONSTRAINT "larps_orgId_fkey";

-- AlterTable
ALTER TABLE "larps" ALTER COLUMN "orgId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "larps" ADD CONSTRAINT "larps_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
