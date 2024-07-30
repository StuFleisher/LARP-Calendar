-- CreateTable
CREATE TABLE "ImageSet" (
    "id" SERIAL NOT NULL,
    "sm" TEXT NOT NULL DEFAULT 'https://sf-larpcal.s3.amazonaws.com/recipeImage/default-sm',
    "md" TEXT NOT NULL DEFAULT 'https://sf-larpcal.s3.amazonaws.com/recipeImage/default-md',
    "lg" TEXT NOT NULL DEFAULT 'https://sf-larpcal.s3.amazonaws.com/recipeImage/default-lg',

    CONSTRAINT "ImageSet_pkey" PRIMARY KEY ("id")
);
