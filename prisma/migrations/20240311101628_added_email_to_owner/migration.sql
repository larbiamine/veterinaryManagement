/*
  Warnings:

  - You are about to drop the column `PhoneNumber` on the `Owner` table. All the data in the column will be lost.
  - Added the required column `email` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "PhoneNumber",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
