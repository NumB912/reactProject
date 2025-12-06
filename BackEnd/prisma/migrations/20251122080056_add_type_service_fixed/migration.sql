/*
  Warnings:

  - You are about to drop the column `type` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type",
ADD COLUMN     "type_id" UUID;

-- CreateTable
CREATE TABLE "TypeService" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TypeService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
