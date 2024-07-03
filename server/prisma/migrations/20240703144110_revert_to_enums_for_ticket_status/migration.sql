/*
  Warnings:

  - Changed the type of `ticketStatus` on the `larps` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('AVAILABLE', 'LIMITED', 'SOLD_OUT');

-- AlterTable
ALTER TABLE "larps" DROP COLUMN "ticketStatus",
ADD COLUMN     "ticketStatus" "TicketStatus" NOT NULL;
