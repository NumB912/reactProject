/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `total_reviews` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `location_id` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `quantity_room` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `type_hotel_id` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_location_id_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "total_reviews" SET DATA TYPE INTEGER,
ALTER COLUMN "location_id" SET DATA TYPE INTEGER,
ALTER COLUMN "quantity_room" SET DATA TYPE INTEGER,
ALTER COLUMN "type_hotel_id" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
