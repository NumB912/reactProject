import prisma from "@/db";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import type { AmenityHotel, Prisma } from "@prisma/client";

export class ManagementAmenityHotel {
  static async EditAmenityHotelService(
    service_id: string,
    change_amenity: number[],
    tx: Prisma.TransactionClient
  ): Promise<
    | SuccessResponse<{
        delete: number;
        insert: number;
      }>
    | ErrorResponse
  > {
    try {
      let insert_amenity = 0;
      let delete_amenity = 0;

      const existingRecords = await tx.amenitiesHotels.findMany({
        where: { service_id: service_id },
        select: { amenity_id: true },
      });

      console.log(existingRecords);
      console.log(change_amenity);

      const existingAmenityIds = existingRecords.map(
        (record) => record.amenity_id
      );

      const incomingAmenityIds = change_amenity;

      const toDelete = existingAmenityIds.filter(
        (id) => !incomingAmenityIds.includes(id)
      );

      const toInsert = incomingAmenityIds.filter(
        (id) => !existingAmenityIds.includes(id)
      );
      if (toDelete.length > 0) {
        await tx.amenitiesHotels.deleteMany({
          where: {
            service_id: service_id,
            amenity_id: { in: toDelete },
          },
        });
      }

      if (toInsert.length > 0) {

        await tx.amenitiesHotels.createMany({
          data: toInsert.map((item)=>({
            amenity_id:item,
            service_id:service_id,
          })),
          skipDuplicates: true,
        });
      }

      return {
        data: {
          delete: delete_amenity,
          insert: insert_amenity,
        },
        message: "",
        status: 200,
        success: true,
      };
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
