import prisma from "@/db";

export class HotelTypeService {
  static async getHotelType() {
    try {
      const hotelType = await prisma.typeHotel.findMany({
        select: {
          id: true,
          type: true,
        },
      });

      return hotelType
    } catch (error) {
      console.error("error", error);
    }
  }
}
