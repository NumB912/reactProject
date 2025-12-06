/*
  Warnings:

  - You are about to drop the column `status` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "status",
ADD COLUMN     "status_id" TEXT;

-- CreateTable
CREATE TABLE "StatusService" (
    "id" TEXT NOT NULL,
    "statusService" TEXT NOT NULL,

    CONSTRAINT "StatusService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusService"("id") ON DELETE SET NULL ON UPDATE CASCADE;
