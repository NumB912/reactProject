/*
  Warnings:

  - You are about to drop the column `district_id` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "district_id",
DROP COLUMN "province_id",
ADD COLUMN     "ward_id" TEXT;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_ward_id_fkey" FOREIGN KEY ("ward_id") REFERENCES "wards"("code") ON DELETE SET NULL ON UPDATE CASCADE;
