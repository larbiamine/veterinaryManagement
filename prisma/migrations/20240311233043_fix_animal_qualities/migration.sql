/*
  Warnings:

  - The `distinctiveQualities` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "distinctiveQualities",
ADD COLUMN     "distinctiveQualities" TEXT[];
