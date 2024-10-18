/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `PasswordResetRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordResetRequest" DROP COLUMN "expiresAt";
