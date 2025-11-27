import prisma from "@/db";
import type { AmenityServiceItem } from "@prisma/client";

export class AmenitesCarService{
  static async EditAmenityCarService(
    service_item_id: string,
    change_amenity: AmenityServiceItem[]
  ) {
    try {
     const transaction = await prisma.$transaction(async (tx) => {
        const existingRecords = await tx.amenitiesCars.findMany({
          where: { id:service_item_id },
          select: { amenity_id: true },
        });

        const existingAmenityIds = existingRecords.map(
          (record) => record.amenity_id
        );
        const incomingAmenityIds = change_amenity.map((item) => item.id);

        const toDelete = existingAmenityIds.filter(
          (id) => !incomingAmenityIds.includes(id)
        );
        const toInsert = incomingAmenityIds.filter(
          (id) => !existingAmenityIds.includes(id)
        );

        if (toDelete.length > 0) {
          await tx.amenitiesRooms.deleteMany({
            where: {
              service_item_id:service_item_id,
              amenity_id: { in: toDelete },
            },
          });
        }

        if (toInsert.length > 0) {
          const dataToInsert = toInsert.map((amenity_id) => ({
            service_item_id,
            amenity_id,
          }));

          await tx.amenitiesRooms.createMany({
            data: dataToInsert,
            skipDuplicates: true,
          });
        }

        return true
      });

      return transaction
    } catch (error) {
      console.error("Error editing hotel amenities:", error);
      throw error;
    }
  }

  static async getAmenityHotel() {
    try {
      const amenitiesHotel = await prisma.amenityHotel.findMany();
      return amenitiesHotel;
    } catch (error) {
      console.error("Lỗi ", error);
    }
  
}
}