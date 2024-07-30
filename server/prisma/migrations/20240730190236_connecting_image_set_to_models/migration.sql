/*
  Warnings:

  - You are about to drop the column `img_url` on the `larps` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the `ImageSet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[img_set_id]` on the table `larps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[img_set_id]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "larps" DROP COLUMN "img_url",
ADD COLUMN     "img_set_id" INTEGER;

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "img_url",
ADD COLUMN     "img_set_id" INTEGER;

-- DropTable
DROP TABLE "ImageSet";

-- CreateTable
CREATE TABLE "image_sets" (
    "id" SERIAL NOT NULL,
    "sm" TEXT NOT NULL DEFAULT 'https://sf-larpcal.s3.amazonaws.com/recipeImage/default-sm',
    "md" TEXT NOT NULL DEFAULT 'https://sf-larpcal.s3.amazonaws.com/recipeImage/default-md',
    "lg" TEXT NOT NULL DEFAULT 'https://sf-larpcal.s3.amazonaws.com/recipeImage/default-lg',

    CONSTRAINT "image_sets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "larps_img_set_id_key" ON "larps"("img_set_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_img_set_id_key" ON "organizations"("img_set_id");

-- AddForeignKey
ALTER TABLE "larps" ADD CONSTRAINT "larps_img_set_id_fkey" FOREIGN KEY ("img_set_id") REFERENCES "image_sets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_img_set_id_fkey" FOREIGN KEY ("img_set_id") REFERENCES "image_sets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
