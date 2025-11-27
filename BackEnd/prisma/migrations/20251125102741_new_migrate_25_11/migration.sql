/*
  Warnings:

  - You are about to alter the column `amenity_id` on the `AmenitiesCars` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amenity_id` on the `AmenitiesHotels` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amenity_id` on the `AmenitiesRooms` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `AmenityCar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `AmenityCar` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `AmenityHotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `AmenityHotel` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `AmenityRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `AmenityRoom` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the column `drop_off` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pick_up` on the `Booking` table. All the data in the column will be lost.
  - The `booking_type_id` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `adult` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `children` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `payment_method_id` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `status_id` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `PaymentMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PaymentMethod` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `parentId` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `replacedBy` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `status_id` on the `RefundRequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `car_type_id` on the `ServiceItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `max_people` on the `ServiceItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `room_type_id` on the `ServiceItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `transmission_id` on the `ServiceItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `StatusPayment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `StatusPayment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `StatusRefundRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `StatusRefundRequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Transmission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Transmission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `TypeBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TypeCar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `TypeCar` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `TypeHotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `TypeHotel` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `_ServiceToTypeHotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `B` on the `_ServiceToTypeHotel` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Changed the type of `id` on the `TypeBooking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AmenitiesCars" DROP CONSTRAINT "AmenitiesCars_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesHotels" DROP CONSTRAINT "AmenitiesHotels_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesRooms" DROP CONSTRAINT "AmenitiesRooms_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_booking_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payment_method_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_status_id_fkey";

-- DropForeignKey
ALTER TABLE "RefundRequest" DROP CONSTRAINT "RefundRequest_status_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_car_type_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_transmission_id_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToTypeHotel" DROP CONSTRAINT "_ServiceToTypeHotel_B_fkey";

-- AlterTable
ALTER TABLE "AmenitiesCars" ALTER COLUMN "amenity_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "AmenitiesHotels" ALTER COLUMN "amenity_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "AmenitiesRooms" ALTER COLUMN "amenity_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "AmenityCar" DROP CONSTRAINT "AmenityCar_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "AmenityCar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AmenityHotel" DROP CONSTRAINT "AmenityHotel_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "AmenityHotel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AmenityRoom" DROP CONSTRAINT "AmenityRoom_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "AmenityRoom_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "drop_off",
DROP COLUMN "pick_up",
ADD COLUMN     "drop_off_id" UUID,
ADD COLUMN     "pick_up_id" UUID,
DROP COLUMN "booking_type_id",
ADD COLUMN     "booking_type_id" UUID,
ALTER COLUMN "adult" DROP NOT NULL,
ALTER COLUMN "adult" SET DATA TYPE INTEGER,
ALTER COLUMN "children" DROP NOT NULL,
ALTER COLUMN "children" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payment_method_id" SET DATA TYPE INTEGER,
ALTER COLUMN "status_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" SET DATA TYPE INTEGER,
ALTER COLUMN "replacedBy" SET DATA TYPE INTEGER,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RefreshToken_id_seq";

-- AlterTable
ALTER TABLE "RefundRequest" ALTER COLUMN "status_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ServiceItem" ALTER COLUMN "car_type_id" SET DATA TYPE INTEGER,
ALTER COLUMN "max_people" SET DATA TYPE INTEGER,
ALTER COLUMN "room_type_id" SET DATA TYPE INTEGER,
ALTER COLUMN "transmission_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "StatusPayment" DROP CONSTRAINT "StatusPayment_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "StatusPayment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StatusRefundRequest" DROP CONSTRAINT "StatusRefundRequest_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "StatusRefundRequest_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transmission" DROP CONSTRAINT "Transmission_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeBooking" DROP CONSTRAINT "TypeBooking_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "TypeBooking_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeCar" DROP CONSTRAINT "TypeCar_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "TypeCar_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TypeHotel" DROP CONSTRAINT "TypeHotel_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "TypeHotel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ServiceToTypeHotel" DROP CONSTRAINT "_ServiceToTypeHotel_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE INTEGER,
ADD CONSTRAINT "_ServiceToTypeHotel_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "AmenitiesHotels" ADD CONSTRAINT "AmenitiesHotels_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityHotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "TypeCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesRooms" ADD CONSTRAINT "AmenitiesRooms_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesCars" ADD CONSTRAINT "AmenitiesCars_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_booking_type_id_fkey" FOREIGN KEY ("booking_type_id") REFERENCES "TypeBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_pick_up_id_fkey" FOREIGN KEY ("pick_up_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_drop_off_id_fkey" FOREIGN KEY ("drop_off_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusPayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundRequest" ADD CONSTRAINT "RefundRequest_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusRefundRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToTypeHotel" ADD CONSTRAINT "_ServiceToTypeHotel_B_fkey" FOREIGN KEY ("B") REFERENCES "TypeHotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
