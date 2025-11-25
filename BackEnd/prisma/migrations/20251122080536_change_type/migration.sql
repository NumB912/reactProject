/*
  Warnings:

  - The primary key for the `TypeService` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_type_id_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "type_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TypeService" DROP CONSTRAINT "TypeService_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TypeService_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
