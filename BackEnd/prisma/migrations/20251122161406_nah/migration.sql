-- AlterTable
ALTER TABLE "ServiceItem" ALTER COLUMN "status_id" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "StatusServiceItem" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StatusServiceItem_id_key" ON "StatusServiceItem"("id");

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusServiceItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
