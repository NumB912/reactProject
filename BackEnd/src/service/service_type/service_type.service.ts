import prisma from "@/db";

export class ServiceType {
  static async getServiceType() {
    try {
      const hotelType = await prisma.typeService.findMany({
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
