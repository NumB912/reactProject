-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
