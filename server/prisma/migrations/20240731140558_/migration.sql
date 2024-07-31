-- AlterTable
ALTER TABLE "image_sets" ALTER COLUMN "sm" SET DEFAULT 'https://sf-larpcal.s3.amazonaws.com/larpImage/default-sm',
ALTER COLUMN "md" SET DEFAULT 'https://sf-larpcal.s3.amazonaws.com/larpImage/default-md',
ALTER COLUMN "lg" SET DEFAULT 'https://sf-larpcal.s3.amazonaws.com/larpImage/default-lg';
