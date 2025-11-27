/*
  Warnings:

  - You are about to drop the `ImagesRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImagesRooms" DROP CONSTRAINT "ImagesRooms_image_id_fkey";

-- DropForeignKey
ALTER TABLE "ImagesRooms" DROP CONSTRAINT "ImagesRooms_service_item_id_fkey";

-- DropTable
DROP TABLE "ImagesRooms";

-- CreateTable
CREATE TABLE "ImagesServiceItem" (
    "id" UUID NOT NULL,
    "image_id" UUID NOT NULL,
    "service_item_id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ImagesServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageServiceItem" (
    "id" UUID NOT NULL,
    "service_item_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ImageServiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagesServiceItem" ADD CONSTRAINT "ImagesServiceItem_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesServiceItem" ADD CONSTRAINT "ImagesServiceItem_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageServiceItem" ADD CONSTRAINT "ImageServiceItem_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageServiceItem" ADD CONSTRAINT "ImageServiceItem_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
