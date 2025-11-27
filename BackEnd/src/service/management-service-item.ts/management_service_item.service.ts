import type { AmenityServiceItem, Image, ServiceItem } from "@prisma/client";
import prisma from "@/db";
import { ImageService } from "../image/image.service";
import { ServiceItemTypeEnum } from "@/enum/service_item/type.serviceItem.enum";
import { RoomService } from "../service_item/room.service";
import { CarService } from "../service_item/car.service";
import { TourService } from "../service_item/tour.service";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import { AmenitesCarService } from "../service_item/amennitiesServiceItem/amenitesCar.service";

export class ManagementServiceItem {
  static async addService(
    serviceItem: ServiceItem,
    ChangeAmenity: AmenityServiceItem[],
    changeImage: Image[]
  ) {
    try {
      const { type_id } = serviceItem;
      let createService = {} as SuccessResponse<ServiceItem> | ErrorResponse;
      let createAmenities = {};
      let imageChange = {};
      console.log(ChangeAmenity);
      switch (type_id) {
        case ServiceItemTypeEnum.ROOM:
          createService = await RoomService.getInstance().createItemService(
            serviceItem
          );
          break;
        case ServiceItemTypeEnum.CAR:
          createService = await CarService.getInstance().createItemService(
            serviceItem
          );
          break;
        case ServiceItemTypeEnum.TOUR:
          createService = await TourService.getInstance().createItemService(
            serviceItem
          );
          break;
      }

      if (createService.success) {
        createAmenities = await AmenitesCarService.EditAmenityCarService(
          createService.data.id,
          ChangeAmenity
        );
      }

      return {
        createService,
        createAmenities,
        imageChange,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateServiceItem(
    serviceItem: ServiceItem,
    ChangeAmenity: AmenityServiceItem[],
    images: Express.Multer.File[] = [],
    delete_image: string[] = []
  ) {
    try {
      let updateService = {} as SuccessResponse<ServiceItem> | ErrorResponse;
      let updateAmenities = {};
      let updateImages = {}

      switch (serviceItem.type_id) {
        case ServiceItemTypeEnum.CAR:
          const update = await CarService.getInstance().updateItemService(
            serviceItem
          );
          updateService = update;
          break;
        case ServiceItemTypeEnum.ROOM:
          updateService = await RoomService.getInstance().updateItemService(
            serviceItem
          );
          break;
        case ServiceItemTypeEnum.TOUR:
          updateService = await TourService.getInstance().updateItemService(
            serviceItem
          );
          break;
      }

      updateAmenities = await AmenitesCarService.EditAmenityCarService(
        serviceItem.id,
        ChangeAmenity
      );

       updateImages = await this.updateImages(serviceItem,images,delete_image)

      return {
        updateService,
        updateAmenities,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateImages(
    service_item: ServiceItem,
    images: Express.Multer.File[] = [],
    delete_image: string[] = []
  ) {
    return await prisma
      .$transaction(async (tx) => {
        const result = {
          added: 0,
          deleted: 0,
          addedImages: [] as any[],
          deletedImageIds: [] as string[],
        };

        if (images && images.length > 0) {
          try {
            const uploadedImages = await ImageService.addImages(
              `/upload/service/${service_item.service_id}/service_item/${service_item.id}`,
              images
            );
            await tx.imageServiceItem.createMany({
              data: uploadedImages.map((image) => ({
                image_id: image.id,
                service_item_id:service_item.id,
              })),
              skipDuplicates: true,
            });

            result.added = uploadedImages.length;
            result.addedImages = uploadedImages;
          } catch (err) {
            console.error("Lỗi khi upload ảnh mới:", err);
            throw err;
          }
        }

        if (delete_image && delete_image.length > 0) {
          try {
            const deleteResult = await ImageService.deleteImages(delete_image);

            result.deleted = deleteResult.deleted || delete_image.length;
            result.deletedImageIds = delete_image;
          } catch (err) {
            console.error("Lỗi khi xóa ảnh:", err);
            throw err;
          }
        }
        return {
          success: true,
          message: "Cập nhật ảnh thành công",
          data: {
            service_item,
            added_count: result.added,
            deleted_count: result.deleted,
            added_images: result.addedImages,
            deleted_image_ids: result.deletedImageIds,
          },
        };
      })
      .catch((error) => {
        console.error("Transaction failed trong updateImages:", error);
        throw new Error("Cập nhật ảnh thất bại: " + error.message);
      });
  }
}
