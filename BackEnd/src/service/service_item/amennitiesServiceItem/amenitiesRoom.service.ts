import prisma from "@/db";
import type { SuccessResponse } from "@/model/api.model";
import type { AmenityServiceItem, Prisma } from "@prisma/client";

export class AmenitesRoomService {
  static async EditAmenityRoomService(
    service_item_id: string,
    change_amenity: number[]=[],
    tx: Prisma.TransactionClient
  ):Promise<SuccessResponse<any>|Error> {


    try {
      let delete_amenity={}
      let add_amenity={}

      const existingRecords = await tx.amenitiesRooms.findMany({
        where: { service_item_id: service_item_id },
        select: { amenity_id: true },
      });

      const existingAmenityIds = existingRecords.map(
        (record) => record.amenity_id
      );
      const incomingAmenityIds = change_amenity

      const toDelete = existingAmenityIds.filter(
        (id) => !incomingAmenityIds.includes(id)
      );
      const toInsert = incomingAmenityIds.filter(
        (id) => !existingAmenityIds.includes(id)
      );

      if (toDelete.length > 0) {
        delete_amenity =await tx.amenitiesRooms.deleteMany({
          where: {
            service_item_id: service_item_id,
            amenity_id: { in: toDelete },
          },
        });
      }

      if (toInsert.length > 0) {
        const dataToInsert = toInsert.map((amenity_id) => ({
          service_item_id,
          amenity_id,
        }));

        add_amenity =await tx.amenitiesRooms.createMany({
          data: dataToInsert,
          skipDuplicates: true,
        });
      }

      return {
        data:{
          delete_amenity:delete_amenity,
          add_amenity:add_amenity
        },
        message:"",
        success:true,
        status:200,
      };
    } catch (error) {
      console.error("Error editing hotel amenities:", error);
      throw error;
    }
  }
}
