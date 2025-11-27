/*
  Warnings:

  - You are about to drop the `AmenityCar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AmenityRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AmenitiesCars" DROP CONSTRAINT "AmenitiesCars_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "AmenitiesRooms" DROP CONSTRAINT "AmenitiesRooms_amenity_id_fkey";

-- DropTable
DROP TABLE "AmenityCar";

-- DropTable
DROP TABLE "AmenityRoom";

-- CreateTable
CREATE TABLE "AmenityServiceItem" (
    "id" SERIAL NOT NULL,
    "amenity" TEXT,
    "icon" TEXT,

    CONSTRAINT "AmenityServiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AmenitiesRooms" ADD CONSTRAINT "AmenitiesRooms_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesCars" ADD CONSTRAINT "AmenitiesCars_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
