/*
  Warnings:

  - You are about to drop the column `car_id` on the `AmenitiesCars` table. All the data in the column will be lost.
  - You are about to drop the column `service_items` on the `ImagesRooms` table. All the data in the column will be lost.
  - Added the required column `service_item_id` to the `AmenitiesCars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_item_id` to the `ImagesRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_from` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_to` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImagesRooms" DROP CONSTRAINT "ImagesRooms_service_items_fkey";

-- AlterTable
ALTER TABLE "AmenitiesCars" DROP COLUMN "car_id",
ADD COLUMN     "service_item_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ImagesRooms" DROP COLUMN "service_items",
ADD COLUMN     "service_item_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "price_from" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "price_to" DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE "ImagesRooms" ADD CONSTRAINT "ImagesRooms_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesCars" ADD CONSTRAINT "AmenitiesCars_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
