import type {
  AmenitiesHotels,
  AmenityHotel,
  Image,
  Service,
  ServiceItem,
  Transmission,
  TypeCar,
  TypeHotel,
} from "@prisma/client";
import { ServiceItemService } from "../service_item/service_item.service";
import prisma from "@/db";
import { ServiceType } from "@/enum/service/type.service.enum";
import { HotelService } from "../service/hotel.service";
import { RentalCarService } from "../service/rentalCar.service";
import { ThingToDoService } from "../service/tour.service";
import type { SuccessResponse } from "@/model/api.model";
import fileService from "../file.service";
import { ImageService } from "../image/image.service";

export class ManagementService {
  static async addService(service: Service) {
    try {
      const { service_type_id } = service;
      let createService = {};

      switch (service_type_id) {
        case ServiceType.HOTEL:
          createService = await HotelService.getInstance().createService(
            service
          );
          break;
        case ServiceType.RENTAL_CAR:
          createService = await RentalCarService.getInstance().createService(
            service
          );
          break;
        case ServiceType.THING_TO_DO:
          createService = await ThingToDoService.getInstance().createService(
            service
          );
          break;
      }

      return {
        createService,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateService(
    service: Service,
    amenitiesHotel?: AmenityHotel[],
    type_hotel?: TypeHotel,
    Transmission?: Transmission
  ) {
    try {
      const { service_type_id } = service;
      let updateService = {};

      switch (service_type_id) {
        case ServiceType.HOTEL:
          const update = await HotelService.getInstance().updateService(
            service
          );
          updateService = update;
          break;
        case ServiceType.RENTAL_CAR:
          updateService = await RentalCarService.getInstance().updateService(
            service
          );
          break;
        case ServiceType.THING_TO_DO:
          updateService = await ThingToDoService.getInstance().updateService(
            service
          );
          break;
      }

      return {
        updateService,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateImages(
    service_id: string,
    images: Express.Multer.File[] = [], 
    delete_image: string[] = []               
  ) {

    return await prisma.$transaction(async (tx) => {
      const result = {
        added: 0,
        deleted: 0,
        addedImages: [] as any[],
        deletedImageIds: [] as string[],
      };


      if (images && images.length > 0) {
        try {
          const uploadedImages = await ImageService.addImages(
            `/upload/service/${service_id}`,
            images
          );
          await tx.imageService.createMany({
            data: uploadedImages.map((image) => ({
              image_id: image.id,
              service_id: service_id,
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
          service_id,
          added_count: result.added,
          deleted_count: result.deleted,
          added_images: result.addedImages,
          deleted_image_ids: result.deletedImageIds,
        },
      };
    }).catch((error) => {
      console.error("Transaction failed trong updateImages:", error);
      throw new Error("Cập nhật ảnh thất bại: " + error.message);
    });
  }


}
