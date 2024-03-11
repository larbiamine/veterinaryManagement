/*
  Warnings:

  - You are about to drop the column `adresse` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `adresse` on the `Vet` table. All the data in the column will be lost.
  - Added the required column `adress` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `Vet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "adresse",
ADD COLUMN     "adress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vet" DROP COLUMN "adresse",
ADD COLUMN     "adress" TEXT NOT NULL;
