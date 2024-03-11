/*
  Warnings:

  - You are about to drop the column `adress` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `fastName` on the `Owner` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `Vet` table. All the data in the column will be lost.
  - You are about to drop the column `fastName` on the `Vet` table. All the data in the column will be lost.
  - Added the required column `address` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Vet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Vet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "adress",
DROP COLUMN "fastName",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vet" DROP COLUMN "adress",
DROP COLUMN "fastName",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
