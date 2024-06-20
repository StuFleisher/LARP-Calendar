-- AlterTable
ALTER TABLE "larps" ALTER COLUMN "organizer" DROP DEFAULT,
ALTER COLUMN "organizer" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "larps" ADD CONSTRAINT "larps_organizer_fkey" FOREIGN KEY ("organizer") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
