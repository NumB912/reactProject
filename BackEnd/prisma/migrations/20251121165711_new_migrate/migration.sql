-- DropForeignKey
ALTER TABLE "AmenitiesThingToDo" DROP CONSTRAINT "AmenitiesThingToDo_ttd_id_fkey";

-- DropForeignKey
ALTER TABLE "ThingToDoService" DROP CONSTRAINT "ThingToDoService_service_id_fkey";

-- AddForeignKey
ALTER TABLE "ThingToDoService" ADD CONSTRAINT "ThingToDoService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
