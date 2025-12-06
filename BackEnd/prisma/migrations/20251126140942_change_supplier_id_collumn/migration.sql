-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_supplier_id_fkey";

-- AlterTable
ALTER TABLE "Request_become_supplier" ADD COLUMN     "service_id" UUID;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "supplier_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Service_supplier_id_idx" ON "Service"("supplier_id");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request_become_supplier" ADD CONSTRAINT "Request_become_supplier_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
