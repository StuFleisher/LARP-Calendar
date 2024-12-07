/*
  Warnings:

  - A unique constraint covering the columns `[orgName]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organizations_orgName_key" ON "organizations"("orgName");
