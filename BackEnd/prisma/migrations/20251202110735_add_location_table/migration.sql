/*
  Warnings:

  - Made the column `province_id` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "province_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "administrative_regions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "code_name" TEXT,
    "code_name_en" TEXT,

    CONSTRAINT "administrative_regions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "administrative_units" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT,
    "full_name_en" TEXT,
    "short_name" TEXT,
    "short_name_en" TEXT,
    "code_name" TEXT,
    "code_name_en" TEXT,

    CONSTRAINT "administrative_units_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "provinces" (
    "code" VARCHAR(20) NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "full_name" TEXT NOT NULL,
    "full_name_en" TEXT,
    "code_name" TEXT,
    "administrative_unit_id" INTEGER,
    CONSTRAINT "provinces_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "wards" (
    "code" VARCHAR(20) NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "full_name" TEXT,
    "full_name_en" TEXT,
    "code_name" TEXT,
    "provinceCode" VARCHAR(20) NOT NULL,
    "administrative_unit_id" INTEGER,

    CONSTRAINT "wards_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE INDEX "idx_provinces_unit" ON "provinces"("administrative_unit_id");

-- CreateIndex
CREATE INDEX "idx_wards_province" ON "wards"("provinceCode");

-- CreateIndex
CREATE INDEX "idx_wards_unit" ON "wards"("administrative_unit_id");

-- AddForeignKey
ALTER TABLE "provinces" ADD CONSTRAINT "provinces_administrative_unit_id_fkey" FOREIGN KEY ("administrative_unit_id") REFERENCES "administrative_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wards" ADD CONSTRAINT "wards_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "provinces"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wards" ADD CONSTRAINT "wards_administrative_unit_id_fkey" FOREIGN KEY ("administrative_unit_id") REFERENCES "administrative_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;
