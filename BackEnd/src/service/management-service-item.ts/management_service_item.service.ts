import type {
  AmenityServiceItem,
  Image,
  Prisma,
  ServiceItem,
} from "@prisma/client";
import prisma from "@/db";
import { ImageService } from "../image/image.service";
import { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import { RoomService } from "../service_item/room.service";
import { CarService } from "../service_item/car.service";
import { TourService } from "../service_item/tour.service";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import { ImageServiceItem } from "../image/image_service_item.service";
import { Image_service_Service } from "../image/image_service.service";
import { AmenitesServiceItems } from "../service_item/amennitiesServiceItem/amenitiesServiceItem.service";

export class ManagementServiceItem {
  static async addServiceItem(
    serviceItem: ServiceItem,
    ChangeAmenity: number[],
    ImageFiles?: Express.Multer.File[]
  ) {
    try {
      return await prisma.$transaction(async (tx) => {
        const { type_id } = serviceItem;
        let createAmenities = {};
        let imageChange = {};
        let createService: SuccessResponse<ServiceItem> | ErrorResponse;
        switch (type_id) {
          case ServiceItemTypeEnum.ROOM:
            createService = await RoomService.getInstance().createItemService(
              serviceItem,
              tx
            );
            break;

          case ServiceItemTypeEnum.CAR:
            createService = await CarService.getInstance().createItemService(
              serviceItem,
              tx
            );
            break;

          case ServiceItemTypeEnum.TOUR:
            createService = await TourService.getInstance().createItemService(
              serviceItem,
              tx
            );
            break;
          default:
            throw new Error("Invalid service type");
        }

        if (createService.success) {
              createAmenities =
                await AmenitesServiceItems.EditAmenityServiceItems(
                  createService.data.id,
                  ChangeAmenity,
                  tx
                );
        }

        if (createService.success && ImageFiles && ImageFiles?.length > 0) {
          imageChange = await this.updateImagesItem(
            createService.data,
            ImageFiles,
            [],
            tx
          );
        }
        return {
          createService,
          createAmenities,
          imageChange,
        };
      });
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateServiceItem(
    serviceItem: ServiceItem,
    ChangeAmenity: number[],
    images: Express.Multer.File[] = [],
    delete_image: string[] = []
  ) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        let updatedServiceItem: any = null;
        let updatedAmenities: any = null;
        let updatedImages: any = null;

        updatedServiceItem = AmenitesServiceItems.EditAmenityServiceItems(serviceItem.id,
                ChangeAmenity,
                tx)

        updatedImages = await this.updateImagesItem(
          serviceItem,
          images || [],
          delete_image,
          tx
        );

        return { updatedServiceItem, updatedAmenities, updatedImages };
      });

      return {
        updatedServiceItem:result.updatedServiceItem,
        updateAmenities:result.updatedAmenities,
        updatedImages:result.updatedImages
      };
    } catch (error: any) {
      console.error("Error in updateServiceItem:", error);
      throw error;
    }
  }

  static async updateImagesItem(
    service_item: ServiceItem,
    images: Express.Multer.File[] = [],
    imageChange: string[] = [],
    tx: Prisma.TransactionClient
  ) {
    if (!service_item.id) {
      throw Error("Không tồn tại dịch vụ");
    }

    const result = {
      added: 0,
      deleted: 0,
      fileDelete:[],
      fileAdd:[]
    };

    const image_exist = await tx.imageServiceItem.findMany({
      where: {
        service_item_id: service_item.id,
      },

      select: {
        image_id: true,
      },
    });

    const existingImageIds = image_exist.map((record) => record.image_id);

    const toDelete = existingImageIds.filter((id) => !imageChange.includes(id));

    if (toDelete.length > 0) {
      await ImageServiceItem.deleteImages(toDelete, tx, service_item.id);
    }

    if (images.length > 0) {
      const addImage = await ImageServiceItem.addImages(
        `/upload/service/${service_item.id}/service_item/image`,
        images,
        service_item.id,
        tx
      );

      result.added = addImage.count
    }

    return {
      data: {
        service_item,
        added_count: result.added,
        deleted_count: result.deleted,
      },
    };
  }

    static async getServiceItems(id: string) {
    try {
      const getService = await prisma.service.findMany({
        where: {
          supplier_id: id,
        },
        select: {
          id:true,
          service_name: true,
          status_id:true,
          status_service:{
            select:{
              statusService:true,
            }
          },
          supplier:{
            select:{
              name:true,
              Request_become_supplier:{
                select:{
                  company_name:true,
                }
              }
            }
          },
          location: {
            select: {
              location: true,
              ward: {
                select: {
                  fullName: true,
                  code: true,
                  province: {
                    select: {
                      fullName: true,
                      code: true,
                    },
                  },
                },
              },
            },
          },
          serviceItems:{
            select:{
              _count:true,
            }
          }
        },
      });
      

      return {
        data: getService,
        message: "Thành công",
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Lỗi không thực thi được",
      };
    }
  }

      static async getServiceItemDetail(id: string) {
    try {
      const getService = await prisma.service.findMany({
        where: {
          supplier_id: id,
        },
        select: {
          id:true,
          service_name: true,
          status_id:true,
          status_service:{
            select:{
              statusService:true,
            }
          },
          supplier:{
            select:{
              name:true,
              Request_become_supplier:{
                select:{
                  company_name:true,
                }
              }
            }
          },
          location: {
            select: {
              location: true,
              ward: {
                select: {
                  fullName: true,
                  code: true,
                  province: {
                    select: {
                      fullName: true,
                      code: true,
                    },
                  },
                },
              },
            },
          },
          serviceItems:{
            select:{
              _count:true,
            }
          }
        },
      });
      

      return {
        data: getService,
        message: "Thành công",
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Lỗi không thực thi được",
      };
    }
  }
}
