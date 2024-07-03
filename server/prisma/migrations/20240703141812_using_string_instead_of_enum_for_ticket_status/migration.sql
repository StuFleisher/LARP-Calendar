/*
  Warnings:

  - You are about to drop the column `ticket_status` on the `larps` table. All the data in the column will be lost.
  - Added the required column `ticketStatus` to the `larps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "larps" DROP COLUMN "ticket_status",
ADD COLUMN     "ticketStatus" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TicketStatus";
