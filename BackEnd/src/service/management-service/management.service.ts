import type {
  AmenitiesHotels,
  AmenityHotel,
  Image,
  Prisma,
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
import { ImageService } from "../image/image.service";
import { Image_service_Service } from "../image/image_service.service";
import { ManagementAmenityHotel } from "../service/amenitiesService/amenities.service";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";

export class ManagementService {
  static async addService(service: Service) {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const { service_type_id } = service;
        let createService = {};
        switch (service_type_id) {
          case ServiceType.HOTEL:
            createService = await HotelService.getInstance().createService(
              service,
              tx
            );
            break;
          case ServiceType.RENTAL_CAR:
            createService = await RentalCarService.getInstance().createService(
              service,tx
            );
            break;
          case ServiceType.THING_TO_DO:
            createService = await ThingToDoService.getInstance().createService(
              service,tx
            );
            break;
        }

        return createService;
      });

      return {
        transaction,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateService(
    service: Service,
    image_change: string[],
    amenities_hotel: number[],
    imageFiles?: Express.Multer.File[]
  ) {
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        const { service_type_id } = service;
        let updateService = {};
        switch (service_type_id) {
          case ServiceType.HOTEL:
            const update = await HotelService.getInstance().updateService(
              service,
              tx
            );

            console.log(update)
            if (!update.success) {
              throw Error("Cập nhật khôgn thành công");
            }

            const amenityHotelUpdate =
              await ManagementAmenityHotel.EditAmenityHotelService(
                service.id,
                amenities_hotel,
                tx
              );

            if (!amenityHotelUpdate.success) {
              throw Error("Cập nhật khôgn thành công");
            }

            const changeImage = await this.updateImages(
              service.id,
              imageFiles,
              image_change,
              tx
            );

            if (!changeImage.success) {
              throw Error("Cập nhật khôgn thành công");
            }

            updateService = {
              update,
              changeImage,
              amenities_hotel,
            };
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

        return updateService;
      });

      return {
        transaction,
      };
    } catch (error) {
      console.error("error", error);
    }
  }

  static async updateImages(
    service_id: string,
    images: Express.Multer.File[] = [],
    imageChange: string[] = [],
    tx: Prisma.TransactionClient
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    if (!service_id) {
      throw Error("Không tồn tại dịch vụ");
    }

    const result = {
      added: 0,
      deleted: 0,
      fileDelete: [],
      fileAdd: [],
    };

    const image_exist = await tx.imageService.findMany({
      where: {
        service_id: service_id,
      },

      select: {
        image_id: true,
      },
    });
    const existingImageIds = image_exist.map((record) => record.image_id);

    const toDelete = existingImageIds.filter((id) => !imageChange.includes(id));

    if (toDelete.length > 0) {
      const deleteimage = await Image_service_Service.deleteImages(toDelete, tx, service_id);
      result.deleted = deleteimage.deleted
    }

    if (images.length > 0) {
      const addImage = await Image_service_Service.addImages(
        `/upload/service/${service_id}/image`,
        images,
        service_id,
        tx
      );

      result.added = addImage.count;
    }

    return {
      data: {
        service_id,
        added_count: result.added,
        deleted_count: result.deleted,
      },
      message: "",
      success: true,
      status: 200,
    };
  }
}
