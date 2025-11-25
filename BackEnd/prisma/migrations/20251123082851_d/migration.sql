/*
  Warnings:

  - You are about to drop the column `service_id` on the `Service` table. All the data in the column will be lost.
  - Made the column `supplier_id` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_supplier_id_fkey";

-- DropIndex
DROP INDEX "Service_service_id_key";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "service_id",
ALTER COLUMN "supplier_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
