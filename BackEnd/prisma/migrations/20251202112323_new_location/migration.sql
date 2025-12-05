/*
  Warnings:

  - You are about to drop the column `provinceCode` on the `wards` table. All the data in the column will be lost.
  - Added the required column `province_code` to the `wards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wards" DROP CONSTRAINT "wards_provinceCode_fkey";

-- DropIndex
DROP INDEX "idx_wards_province";

-- AlterTable
ALTER TABLE "wards" DROP COLUMN "provinceCode",
ADD COLUMN     "province_code" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_wards_province" ON "wards"("province_code");

-- AddForeignKey
ALTER TABLE "wards" ADD CONSTRAINT "wards_province_code_fkey" FOREIGN KEY ("province_code") REFERENCES "provinces"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
