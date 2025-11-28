import prisma from "@/db";
import type { AmenityServiceItem, Prisma } from "@prisma/client";

export class AmenitesCarService {
  static async EditAmenityCarService(
  service_item_id: string,
  change_amenity: number[],
  tx: Prisma.TransactionClient
) {
  try {
    const car = await tx.serviceItem.findUnique({
      where: { id: service_item_id },
    });

    if (!car) {
      throw new Error("Service item không tồn tại");
    }
    const existingRecords = await tx.amenitiesCars.findMany({
      where: { service_item_id: service_item_id },
      select: { amenity_id: true },
    });

    const existingAmenityIds = existingRecords.map((r) => r.amenity_id);
    const incomingAmenityIds = change_amenity;

    const toDelete = existingAmenityIds.filter(
      (id) => !incomingAmenityIds.includes(id)
    );

    const toInsert = incomingAmenityIds.filter(
      (id) => !existingAmenityIds.includes(id)
    );

    if (toDelete.length > 0) {
      await tx.amenitiesCars.deleteMany({
        where: {
          service_item_id: service_item_id,
          amenity_id: { in: toDelete },
        },
      });
    }

    if (toInsert.length > 0) {
      const newData = toInsert.map((amenity_id) => ({
        service_item_id: service_item_id,
        amenity_id,
      }));

      await tx.amenitiesCars.createMany({
        data: newData,
        skipDuplicates: true,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error editing car amenities:", error);
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
