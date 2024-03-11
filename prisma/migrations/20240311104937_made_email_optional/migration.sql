/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
