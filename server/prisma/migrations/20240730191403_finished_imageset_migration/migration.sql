/*
  Warnings:

  - Made the column `img_set_id` on table `larps` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img_set_id` on table `organizations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "larps" DROP CONSTRAINT "larps_img_set_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_img_set_id_fkey";

-- AlterTable
ALTER TABLE "larps" ALTER COLUMN "img_set_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "img_set_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "larps" ADD CONSTRAINT "larps_img_set_id_fkey" FOREIGN KEY ("img_set_id") REFERENCES "image_sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_img_set_id_fkey" FOREIGN KEY ("img_set_id") REFERENCES "image_sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
