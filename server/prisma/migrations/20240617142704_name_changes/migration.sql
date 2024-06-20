/*
  Warnings:

  - You are about to drop the column `tag_id` on the `larps_tags` table. All the data in the column will be lost.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tags` table. All the data in the column will be lost.
  - Added the required column `tag_name` to the `larps_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "larps_tags" DROP CONSTRAINT "larps_tags_tag_id_fkey";

-- AlterTable
ALTER TABLE "larps" ALTER COLUMN "ticket_status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "larps_tags" DROP COLUMN "tag_id",
ADD COLUMN     "tag_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "larps_tags" ADD CONSTRAINT "larps_tags_tag_name_fkey" FOREIGN KEY ("tag_name") REFERENCES "tags"("name") ON DELETE CASCADE ON UPDATE CASCADE;
