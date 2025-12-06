/*
  Warnings:

  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `district_id` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `province_id` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The `location_id` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_location_id_fkey";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "district_id" SET DATA TYPE INTEGER,
ALTER COLUMN "province_id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "location_id",
ADD COLUMN     "location_id" UUID;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
