import prisma from "@/db";
import type { Service, ServiceItem } from "@prisma/client";

export class ServiceItemService {
  async createServiceItem(service_item: ServiceItem) {
    try {
      const createServiceItem = await prisma.serviceItem.create({
        data: {
          service_id: service_item.service_id,
          availiable_from: service_item.availiable_from,
          availiable_to: service_item.availiable_to,
          name: service_item.name,
          price: service_item.price,
          status_id: service_item.status_id,
          type_id: service_item.type_id,
        },
      });

      return createServiceItem;
    } catch (error) {
      console.error("Lỗi trong quá trình tạo dịch vụ");
      return {
        sucesss: true,
        message: "Lỗi trong quá trình tạo dịch vụ",
        status: 500,
      };
    }
  }

  async updateServiceItem(service_item: ServiceItem) {
    try {

        const updateServiceItem = await prisma.serviceItem.update({
            where:{id:service_item.id},
            data:{
                price:service_item.price,
                name:service_item.name,
                status_id:service_item.status_id,
                availiable_from:service_item.availiable_from,
                availiable_to:service_item.availiable_to,
            }
        })
        return updateServiceItem

    } catch (error) {
         console.error("Lỗi trong quá trình tạo dịch vụ");
      return {
        sucesss: true,
        message: "Lỗi trong quá trình tạo dịch vụ",
        status: 500,
      };
    }
  }

  async deleteServiceItem(service_item:ServiceItem){
    try{
        await prisma.serviceItem.delete({
            where:{
                id:service_item.id
            }
        })
    }catch(error){
         console.error("Lỗi trong quá trình xóa dịch vụ");
      return {
        sucesss: true,
        message: "Lỗi trong quá trình xóa dịch vụ",
        status: 500,
      };
    }
  }
}
