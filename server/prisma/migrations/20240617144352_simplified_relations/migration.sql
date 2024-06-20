/*
  Warnings:

  - You are about to drop the `larps_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "larps_tags" DROP CONSTRAINT "larps_tags_larp_id_fkey";

-- DropForeignKey
ALTER TABLE "larps_tags" DROP CONSTRAINT "larps_tags_tag_name_fkey";

-- DropTable
DROP TABLE "larps_tags";

-- CreateTable
CREATE TABLE "_LarpToTag" (
    "A" INTEGER NOT NULL,
    "B" VARCHAR(100) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LarpToTag_AB_unique" ON "_LarpToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_LarpToTag_B_index" ON "_LarpToTag"("B");

-- AddForeignKey
ALTER TABLE "_LarpToTag" ADD CONSTRAINT "_LarpToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "larps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LarpToTag" ADD CONSTRAINT "_LarpToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("name") ON DELETE CASCADE ON UPDATE CASCADE;
