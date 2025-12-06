/*
  Warnings:

  - The primary key for the `TypeBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_booking_type_id_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "booking_type_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TypeBooking" DROP CONSTRAINT "TypeBooking_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TypeBooking_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_booking_type_id_fkey" FOREIGN KEY ("booking_type_id") REFERENCES "TypeBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
