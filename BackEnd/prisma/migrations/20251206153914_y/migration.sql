/*
  Warnings:

  - You are about to drop the `AmenitiesCars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AmenitiesRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AmenitiesCars" DROP CONSTRAINT "AmenitiesCars_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesCars" DROP CONSTRAINT "AmenitiesCars_service_item_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesRooms" DROP CONSTRAINT "AmenitiesRooms_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesRooms" DROP CONSTRAINT "AmenitiesRooms_service_item_id_fkey";

-- DropTable
DROP TABLE "AmenitiesCars";

-- DropTable
DROP TABLE "AmenitiesRooms";

-- CreateTable
CREATE TABLE "AmenitiesServiceItems" (
    "id" UUID NOT NULL,
    "service_item_id" UUID NOT NULL,
    "amenity_id" INTEGER NOT NULL,

    CONSTRAINT "AmenitiesServiceItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AmenitiesServiceItems" ADD CONSTRAINT "AmenitiesServiceItems_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesServiceItems" ADD CONSTRAINT "AmenitiesServiceItems_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
