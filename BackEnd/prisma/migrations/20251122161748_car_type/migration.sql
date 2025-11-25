-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "TypeCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
