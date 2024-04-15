/*
  Warnings:

  - Added the required column `status` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'RESCHEDULED');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" "AppointmentStatus" NOT NULL;
