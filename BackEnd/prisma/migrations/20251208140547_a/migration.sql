-- AlterTable
ALTER TABLE "Request_become_supplier" ADD COLUMN     "location_id" UUID;

-- AddForeignKey
ALTER TABLE "Request_become_supplier" ADD CONSTRAINT "Request_become_supplier_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
