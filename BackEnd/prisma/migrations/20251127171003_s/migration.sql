/*
  Warnings:

  - You are about to drop the `ImagesServiceItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagesServiceItem" DROP CONSTRAINT "ImagesServiceItem_image_id_fkey";

-- DropForeignKey
ALTER TABLE "ImagesServiceItem" DROP CONSTRAINT "ImagesServiceItem_service_item_id_fkey";

-- DropTable
DROP TABLE "ImagesServiceItem";
