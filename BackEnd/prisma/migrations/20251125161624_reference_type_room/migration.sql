-- AlterTable
ALTER TABLE "ServiceItem" ALTER COLUMN "room_type_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "TypeRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
