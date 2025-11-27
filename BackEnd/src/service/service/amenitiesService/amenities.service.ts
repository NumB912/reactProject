import prisma from "@/db";
import type { AmenityHotel } from "@prisma/client";

export class ManagementAmenityHotel {
  static async EditAmenityHotelService(
    service_id: string,
    change_amenity: AmenityHotel[]
  ) {
    try {
      await prisma.$transaction(async (tx) => {
        const existingRecords = await tx.amenitiesHotels.findMany({
          where: { service_id },
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
          await tx.amenitiesHotels.deleteMany({
            where: {
              service_id,
              amenity_id: { in: toDelete },
            },
          });
        }

        if (toInsert.length > 0) {
          const dataToInsert = toInsert.map((amenity_id) => ({
            service_id,
            amenity_id,
          }));

          await tx.amenitiesHotels.createMany({
            data: dataToInsert,
            skipDuplicates: true,
          });
        }

        console.log({
          service_id,
          deleted: toDelete,
          inserted: toInsert,
        });
      });
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
