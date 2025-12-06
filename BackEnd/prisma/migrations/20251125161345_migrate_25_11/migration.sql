/*
  Warnings:

  - The primary key for the `StatusPayment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transmission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TypeCar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TypeHotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_ServiceToTypeHotel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `AmenityRoom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `StatusPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Transmission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TypeCar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TypeHotel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_status_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_car_type_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_transmission_id_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToTypeHotel" DROP CONSTRAINT "_ServiceToTypeHotel_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToTypeHotel" DROP CONSTRAINT "_ServiceToTypeHotel_B_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "type_hotel_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ServiceItem" ALTER COLUMN "car_type_id" SET DATA TYPE TEXT,
ALTER COLUMN "transmission_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StatusPayment" DROP CONSTRAINT "StatusPayment_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StatusPayment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StatusServiceItem" ADD CONSTRAINT "StatusServiceItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transmission" DROP CONSTRAINT "Transmission_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeCar" DROP CONSTRAINT "TypeCar_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TypeCar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeHotel" DROP CONSTRAINT "TypeHotel_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TypeHotel_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_ServiceToTypeHotel";

-- CreateTable
CREATE TABLE "TypeRoom" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TypeRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeRoom_id_key" ON "TypeRoom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AmenityRoom_id_key" ON "AmenityRoom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusPayment_id_key" ON "StatusPayment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transmission_id_key" ON "Transmission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeCar_id_key" ON "TypeCar"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeHotel_id_key" ON "TypeHotel"("id");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_type_hotel_id_fkey" FOREIGN KEY ("type_hotel_id") REFERENCES "TypeHotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "TypeCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusPayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
