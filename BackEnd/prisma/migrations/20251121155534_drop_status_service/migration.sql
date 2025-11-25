/*
  Warnings:

  - You are about to drop the column `status_id` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `StatusService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_status_id_fkey";

-- DropForeignKey
ALTER TABLE "ServiceItem" DROP CONSTRAINT "ServiceItem_status_id_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "status_id";

-- DropTable
DROP TABLE "StatusService";
