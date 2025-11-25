/*
  Warnings:

  - The primary key for the `TypeBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[type_id]` on the table `ServiceItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_booking_type_id_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "booking_type_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TypeBooking" DROP CONSTRAINT "TypeBooking_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TypeBooking_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "TypeServiceItem" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TypeServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeServiceItem_id_key" ON "TypeServiceItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceItem_type_id_key" ON "ServiceItem"("type_id");

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeServiceItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_booking_type_id_fkey" FOREIGN KEY ("booking_type_id") REFERENCES "TypeBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
