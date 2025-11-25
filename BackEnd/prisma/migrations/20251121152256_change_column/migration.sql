/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_district_id_fkey";

-- DropForeignKey
ALTER TABLE "Province" DROP CONSTRAINT "Province_country_id_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "province_id" BIGINT;

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "District";
