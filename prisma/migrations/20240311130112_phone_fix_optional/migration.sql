/*
  Warnings:

  - You are about to drop the column `PhoneNumber` on the `Vet` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Vet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vet" DROP COLUMN "PhoneNumber",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
