/*
  Warnings:

  - You are about to drop the column `hote_id` on the `AmenitiesHotels` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `AmenitiesRooms` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `ImagesRooms` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `tranmission` on the `Transmission` table. All the data in the column will be lost.
  - You are about to drop the `AmenitiesHotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AmenitiesThingToDo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AmenityThingToDo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingCar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingThingToDo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentalCarService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThingToDoService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TtdItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AmenitiesHotelToAmenityHotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `amenity_hotel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[service_id]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `service_id` to the `AmenitiesHotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_item_id` to the `AmenitiesRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adult` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `children` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_item_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_items` to the `ImagesRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AmenitiesCars" DROP CONSTRAINT "AmenitiesCars_car_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesHotels" DROP CONSTRAINT "AmenitiesHotels_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesHotels" DROP CONSTRAINT "AmenitiesHotels_hote_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesRooms" DROP CONSTRAINT "AmenitiesRooms_room_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesThingToDo" DROP CONSTRAINT "AmenitiesThingToDo_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingCar" DROP CONSTRAINT "BookingCar_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingCar" DROP CONSTRAINT "BookingCar_car_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingCar" DROP CONSTRAINT "BookingCar_drop_off_fkey";

-- DropForeignKey
ALTER TABLE "BookingCar" DROP CONSTRAINT "BookingCar_pick_up_fkey";

-- DropForeignKey
ALTER TABLE "BookingRoom" DROP CONSTRAINT "BookingRoom_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingRoom" DROP CONSTRAINT "BookingRoom_room_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingThingToDo" DROP CONSTRAINT "BookingThingToDo_booking_id_fkey";

-- DropForeignKey
ALTER TABLE "BookingThingToDo" DROP CONSTRAINT "BookingThingToDo_ttd_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_car_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_service_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_transmission_id_fkey";

-- DropForeignKey
ALTER TABLE "HotelService" DROP CONSTRAINT "HotelService_service_id_fkey";

-- DropForeignKey
ALTER TABLE "HotelService" DROP CONSTRAINT "HotelService_type_hotel_id_fkey";

-- DropForeignKey
ALTER TABLE "ImagesRooms" DROP CONSTRAINT "ImagesRooms_room_id_fkey";

-- DropForeignKey
ALTER TABLE "RentalCarService" DROP CONSTRAINT "RentalCarService_service_id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_room_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_service_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_type_id_fkey";

-- DropForeignKey
ALTER TABLE "ThingToDoService" DROP CONSTRAINT "ThingToDoService_service_id_fkey";

-- DropForeignKey
ALTER TABLE "TtdItem" DROP CONSTRAINT "TtdItem_service_item_id_fkey";

-- DropForeignKey
ALTER TABLE "_AmenitiesHotelToAmenityHotel" DROP CONSTRAINT "_AmenitiesHotelToAmenityHotel_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenitiesHotelToAmenityHotel" DROP CONSTRAINT "_AmenitiesHotelToAmenityHotel_B_fkey";

-- AlterTable
ALTER TABLE "AmenitiesHotels" DROP COLUMN "hote_id",
ADD COLUMN     "service_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "AmenitiesRooms" DROP COLUMN "room_id",
ADD COLUMN     "service_item_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "adult" BIGINT NOT NULL,
ADD COLUMN     "children" BIGINT NOT NULL,
ADD COLUMN     "drop_off" BIGINT,
ADD COLUMN     "pick_up" BIGINT,
ADD COLUMN     "service_item_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ImagesRooms" DROP COLUMN "room_id",
ADD COLUMN     "service_items" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type_id",
ADD COLUMN     "info" TEXT,
ADD COLUMN     "quantity_room" BIGINT,
ADD COLUMN     "service_id" UUID NOT NULL,
ADD COLUMN     "service_type_id" TEXT,
ADD COLUMN     "type_hotel_id" BIGINT;

-- AlterTable
ALTER TABLE "ServiceItem" ADD COLUMN     "area" DECIMAL,
ADD COLUMN     "car_type_id" BIGINT,
ADD COLUMN     "duration" TIMESTAMPTZ(6),
ADD COLUMN     "location_id" UUID,
ADD COLUMN     "max_people" BIGINT,
ADD COLUMN     "room_type_id" BIGINT,
ADD COLUMN     "transmission_id" BIGINT;

-- AlterTable
ALTER TABLE "Transmission" DROP COLUMN "tranmission",
ADD COLUMN     "transmission" TEXT;

-- DropTable
DROP TABLE "AmenitiesHotel";

-- DropTable
DROP TABLE "AmenitiesThingToDo";

-- DropTable
DROP TABLE "AmenityThingToDo";

-- DropTable
DROP TABLE "BookingCar";

-- DropTable
DROP TABLE "BookingRoom";

-- DropTable
DROP TABLE "BookingThingToDo";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "HotelService";

-- DropTable
DROP TABLE "RentalCarService";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "RoomType";

-- DropTable
DROP TABLE "ThingToDoService";

-- DropTable
DROP TABLE "TtdItem";

-- DropTable
DROP TABLE "_AmenitiesHotelToAmenityHotel";

-- DropTable
DROP TABLE "amenity_hotel";

-- CreateTable
CREATE TABLE "AmenityHotel" (
    "id" BIGSERIAL NOT NULL,
    "amenity" VARCHAR(150) NOT NULL,
    "icon" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AmenityHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServiceToTypeHotel" (
    "A" UUID NOT NULL,
    "B" BIGINT NOT NULL,

    CONSTRAINT "_ServiceToTypeHotel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ServiceToTypeHotel_B_index" ON "_ServiceToTypeHotel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Service_service_id_key" ON "Service"("service_id");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "TypeService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesHotels" ADD CONSTRAINT "AmenitiesHotels_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityHotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesHotels" ADD CONSTRAINT "AmenitiesHotels_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesRooms" ADD CONSTRAINT "ImagesRooms_service_items_fkey" FOREIGN KEY ("service_items") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesRooms" ADD CONSTRAINT "AmenitiesRooms_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToTypeHotel" ADD CONSTRAINT "_ServiceToTypeHotel_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToTypeHotel" ADD CONSTRAINT "_ServiceToTypeHotel_B_fkey" FOREIGN KEY ("B") REFERENCES "TypeHotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
