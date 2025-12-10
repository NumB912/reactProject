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
import type { Decimal } from "@prisma/client/runtime/library";

export class ManagementService {
  static async addService(
    supplier_id:string,
    service_type_id:string,
    location:{
      ln:string,
      ward_id:string,
      province:string,
    },
    info:string,
    service_name:string,
    price_from:Decimal,
    price_to:Decimal,
    status_id:string) {
    try {
      
      const transaction = await prisma.$transaction(async (tx) => {
        let createService = {};
        switch (service_type_id) {
          case ServiceType.HOTEL:

              const createLocation =await tx.location.create({
                data:{
                  ward_id:location.ward_id,
                  location:location.ln
                }
              })
            

           const create = await HotelService.getInstance().createService(
              {
                location_id:createLocation.id,
                service_name:service_name,
                price_from:price_from,
                price_to:price_to,
                status_id:status_id,
                info:info,
                supplier_id:supplier_id,
                service_type_id:service_type_id
              },
              tx
            );

            createService ={
              create
            }

            break;
          // case ServiceType.RENTAL_CAR:
          //   createService = await RentalCarService.getInstance().createService(
          //     service,
          //     tx
          //   );
          //   break;
          // case ServiceType.THING_TO_DO:
          //   createService = await ThingToDoService.getInstance().createService(
          //     service,
          //     tx
          //   );
          //   break;
        }
        
        return createService
      });

      return {
          data:transaction,
          status:200,
          message:"Thành công",
      };
    } catch (error) {
      console.error("error", error);
       return {
          status:500,
          message:"Thành công",
      };
    }
  }

  static async updateService(
    service_id:string,
    location:{
      ln:string,
      ward_id:string,
      province:string,
    },
    service_name:string,
    price_from:Decimal,
    price_to:Decimal,
    status_id:string,
    info:string,
    image_change: string[],
    amenities_hotel: number[],
    imageFiles?: Express.Multer.File[]
  ) {
    try {
      let data:Service = {
        id:service_id,
        service_name:service_name,
        info:info,
        price_from:price_from,
        price_to:price_to,
        status_id:status_id
      }

      const Servicetemp = await prisma.service.findUnique({
        where:{
          id:service_id
        }
      })
      const transaction = await prisma.$transaction(async (tx) => {
        const service_type_id = Servicetemp?.service_type_id;
        let updateService = {};
        switch (service_type_id) {
          case ServiceType.HOTEL:

            const changeImage = await this.updateImages(
              service_id,
              imageFiles,
              image_change,
              tx
            );

            if(location){
              const createLocation =await tx.location.create({
                data:{
                  ward_id:location.ward_id,
                  location:location.ln
                }
              })

              data = {
                ...data,
                location_id:createLocation.id,
              }

              if(Servicetemp?.location_id){
                await tx.location.delete({
                  where:{
                    id:Servicetemp.location_id
                  }
                })
              }

            }

            const update = await HotelService.getInstance().updateService( 
              data,
              tx
            );

            if (!update.success) {
              throw Error("Cập nhật khôgn thành công");
            }

            const amenityHotelUpdate =
              await ManagementAmenityHotel.EditAmenityHotelService(
                service_id,
                amenities_hotel,
                tx
              );

            if (!amenityHotelUpdate.success) {
              throw Error("Cập nhật khôgn thành công");
            }

          

            if (!changeImage.success) {
              throw Error("Cập nhật khôgn thành công");
            }

            updateService = {
              update,
              changeImage,
              amenities_hotel,
            };
            break;
        }

        return updateService;
      });

      return {
        data:transaction,
        message:"Update thành công",
        status:200
      };
    } catch (error) {
      console.error("error", error);
      return {
        message:"Không thành công",
        status:500
      }
    }
  }

  static async getService(id: string) {
    try {
      const getService = await prisma.service.findMany({
        where: {
          supplier_id: id,
        },
        select: {
          id:true,
          service_name: true,
          createdAt: true,
          updatedAt: true,
          imageServices: {
            select: {
              image: {
                select: {
                  url: true,
                  id: true,
                },
              },
            },
          },
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
          price_from: true,
          price_to: true,
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

  static async getDetailService(id: string, supplier_id: string) {
    try {

      const getService = await prisma.service.findUnique({
        where: {
          supplier_id: supplier_id,
          id: id,
        },
        select: {
          service_name: true,
          createdAt: true,
          updatedAt: true,
          imageServices: {
            select: {
              image: {
                select: {
                  url: true,
                  id: true,
                },
              },
            },
          },
          status_id:true,
          status_service:{
            select:{
              statusService:true,
              id:true,
            }
          },
          supplier:{
            select:{
              name:true,
              phone:true,
              email:true,
              bio:true,
              Request_become_supplier:{
                select:{
                  company_name:true,
                }
              }
            }
          },
          amenities_hotels: {
            select: {
              amenity: {
                select: {
                  amenity: true,
                  id: true,
                },
              },
            },
          }
          ,
          price_from: true,
          price_to: true,
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
        },
      });

     const reviewsAggregate = await prisma.review.aggregate({
  where: {
    service_id: id,
  },
  _avg: {
    rating: true,
  },
  _count: true,
});

      return {
        data: {
          ...getService,
          rating:reviewsAggregate._avg.rating||0,
          review:reviewsAggregate._count
        },
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
      const deleteimage = await Image_service_Service.deleteImages(
        toDelete,
        tx,
        service_id
      );
      result.deleted = deleteimage.deleted;
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
