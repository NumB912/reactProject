/*
  Warnings:

  - You are about to alter the column `google_id` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(255)`.
  - A unique constraint covering the columns `[image_id]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wallpaper_id]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image_wallpaper" VARCHAR(255),
ADD COLUMN     "wallpaper_id" UUID,
ALTER COLUMN "create_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "google_id" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Person_image_id_key" ON "Person"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Person_wallpaper_id_key" ON "Person"("wallpaper_id");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_wallpaper_id_fkey" FOREIGN KEY ("wallpaper_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
