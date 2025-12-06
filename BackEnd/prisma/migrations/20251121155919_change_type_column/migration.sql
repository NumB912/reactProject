/*
  Warnings:

  - You are about to drop the column `type_id` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `TypeService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_type_id_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type_id",
ADD COLUMN     "type" TEXT;

-- DropTable
DROP TABLE "TypeService";
