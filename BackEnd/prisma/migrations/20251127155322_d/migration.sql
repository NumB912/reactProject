-- AlterTable
ALTER TABLE "AmenityServiceItem" ADD COLUMN     "type_id" TEXT;

-- AddForeignKey
ALTER TABLE "AmenityServiceItem" ADD CONSTRAINT "AmenityServiceItem_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeServiceItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
