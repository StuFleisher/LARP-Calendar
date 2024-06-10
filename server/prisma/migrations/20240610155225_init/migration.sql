-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('AVAILABLE', 'LIMITED', 'SOLD_OUT');

-- CreateTable
CREATE TABLE "larps" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL DEFAULT '',
    "ticket_status" "TicketStatus" NOT NULL DEFAULT 'AVAILABLE',
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "all_day" BOOLEAN NOT NULL,
    "img_url" VARCHAR(500) NOT NULL DEFAULT '',
    "city" VARCHAR(100) NOT NULL DEFAULT '',
    "country" VARCHAR(100) NOT NULL DEFAULT '',
    "language" VARCHAR(100) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "organizer" VARCHAR(500) NOT NULL DEFAULT '',
    "event_url" VARCHAR(500) NOT NULL DEFAULT '',

    CONSTRAINT "larps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "larps_tags" (
    "id" SERIAL NOT NULL,
    "larp_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "larps_tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "larps_tags" ADD CONSTRAINT "larps_tags_larp_id_fkey" FOREIGN KEY ("larp_id") REFERENCES "larps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "larps_tags" ADD CONSTRAINT "larps_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
