-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "fastName" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "idCardNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vet" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "fastName" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "idCardNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,

    CONSTRAINT "Vet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "distinctiveQualities" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "vetId" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "Vet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
