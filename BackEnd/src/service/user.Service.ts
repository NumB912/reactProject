import prisma from "../db.js";
import FileService from "./file.service.js";
import { ServiceType } from "@/enum/service/type.service.enum.js";
import { StatusBecomeSupplier } from "@/enum/status.become.supplier.enum.js";
import type { EditProfileDTO } from "@/model/user/edit.profile_DTO.model.js";
import type { BecomeSupplierDTO } from "@/model/user/becomeSuplier_DTO.model.js";
import factoryServiceCreator from "./factory/factory.service.creator.js";
import { EmailService } from "./email.Service.js";
import { isValidUUID } from "@/utils/isvalidateUuid.utils.js";
import { error } from "console";
import { StatusType } from "@/enum/service/status.service.enum.js";
import type { Service } from "@prisma/client";
import type { SuccessResponse } from "@/model/api.model.js";

export class userService {
  static async getAllUsers() {
    return await prisma.person.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location_id: true,
        role_id: true,
        image_id: true,
        image: true,
        role: true,
        services: true,
      },
    });
  }

  static async findOne() {
    return await prisma.person.findFirst({
      select: {
        id: true,
      },
    });
  }

  static async editProfile(profile: EditProfileDTO):Promise<{success:boolean,status:number,message:string}> {
    try {
      const data: any = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
      };

      const avatarFile = profile.avatarFile;
      const wallpaperFile = profile.wallpaperFile;

      if(!isValidUUID(profile.id)){
         return {
          success:false,
          message:"Không tồn tại người dùng",
          status:400,
        }
      }

      const person = await prisma.person.findUnique({
        where: { id: profile.id },
        select: {
          id: true,
          image_id: true,
          wallpaper_id: true,
          image: true,
          wallpaper: true,
        },
      });

      if(!person){
        return {
          success:false,
          message:"Không tồn tại người dùng",
          status:400,
        }
      }

      const prismaTransaction = await prisma.$transaction(async (tx) => {
        if (profile.avatarFile && profile.avatarFile.size > 0) {
          const avatar = {
            url: `/upload/user/${profile.id}/avatar/`,
            description: "User avatar",
          };
          await FileService.uploadFile(profile.avatarFile, avatar.url);
          const avatarCreate = await prisma.image.create({
            data: {
              url:
                avatar.url +
                profile.avatarFile.filename +
                "." +
                profile.avatarFile.mimetype.split("/")[1],
              description: "User avatar",
            },
          });

          data.image_id = avatarCreate.id;
        }

        if (profile.wallpaperFile && profile.wallpaperFile.size > 0) {
          const wallpaper = {
            url: `/upload/user/${profile.id}/wallpaper/`,
            description: "User wallpaper",
          };
          await FileService.uploadFile(profile.wallpaperFile, wallpaper.url);
          const wallpaperCreate = await prisma.image.create({
            data: {
              url:
                wallpaper.url +
                profile.wallpaperFile.filename +
                "." +
                profile.wallpaperFile.mimetype.split("/")[1],
              description: "User wallpaper",
            },
          });
          data.wallpaper_id = wallpaperCreate.id;
        }

        const updated = await tx.person.update({
          where: { id: profile.id },
          data: data,
          include: { image: true, wallpaper: true },
        });

        setImmediate(async () => {
          try {
            if (avatarFile && person?.image_id) {
              await prisma.image.delete({ where: { id: person?.image_id } });
              await FileService.deleteFile(person.image?.url || "");
            }
            if (wallpaperFile && person?.wallpaper_id) {
              await prisma.image.delete({ where: { id: person.wallpaper_id } });
              console.log(person.wallpaper?.url);
              await FileService.deleteFile(person.wallpaper?.url || "");
            }
          } catch (err) {
            console.warn("Cleanup old files failed:", err);
          }
        });

        return updated;
      });

      return {
        success:true,
        message:"Cập nhật thông tin người dùng thành công",
        status:200,
      };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  static async becomeSupplier(becomeSupplier: BecomeSupplierDTO):Promise<{success:boolean,message:string,status:number}> {
    try {
      let checkIsDone = {} as SuccessResponse<Service>

      const transaction = await prisma.$transaction(async (ts) => {
        const locationCreated = await prisma.location.create({
          data: {
            district_id: becomeSupplier.district_id,
            province_id: becomeSupplier.province_id,
            lat: becomeSupplier.lat,
            lng: becomeSupplier.lng,
            location: becomeSupplier.lcg,
          },
        });

        if (ServiceType.HOTEL == becomeSupplier.type_service) {
          const hotelCreator = await factoryServiceCreator.factory(ServiceType.HOTEL);
           checkIsDone = await hotelCreator.create({
              service_name: becomeSupplier.property_name,
              service_type_id: ServiceType.HOTEL,
              supplier_id: becomeSupplier.user_id,
              location_id: locationCreated.id,
          })
        } else if (ServiceType.RENTAL_CAR == becomeSupplier.type_service) {
          const rentalCreator =await factoryServiceCreator.factory(
            ServiceType.RENTAL_CAR
          );
          checkIsDone = await  rentalCreator.create({
              service_name: becomeSupplier.property_name,
              service_type_id: ServiceType.RENTAL_CAR,
              supplier_id: becomeSupplier.user_id,
              location_id: locationCreated.id,
          })
        } else if (ServiceType.THING_TO_DO == becomeSupplier.type_service) {
          const tourCreator = await factoryServiceCreator.factory(ServiceType.THING_TO_DO);
          checkIsDone=await tourCreator?.create(
            {
              service_name: becomeSupplier.property_name,
              service_type_id: ServiceType.THING_TO_DO,
              supplier_id: becomeSupplier.user_id,
              location_id: locationCreated.id,
            },
          );
        }



      const create_request = await prisma.request_become_supplier.create({
        data: {
          name: "service",
          status: StatusBecomeSupplier.PEDDING,
          user_id: becomeSupplier.user_id,
          tax_code:becomeSupplier.tax_code,
          service_id:checkIsDone.data.id
        },
      });

      if (becomeSupplier.tax_files && becomeSupplier.tax_files.length > 0) {
        const tax = {
          upload_by_id: becomeSupplier.user_id,
          file_url: `/upload/user/${becomeSupplier.user_id}/evidence/tax`,
          file_type: becomeSupplier.type_service,
          upload_at: new Date(),
        };
        for (let taxFile of becomeSupplier.tax_files) {
          await FileService.uploadFile(taxFile, tax.file_url);
          const create_tax_file = await prisma.document_supplier.create({
            data: {
              file_type: "pdf",
              file_url: `${tax.file_url}/${taxFile.filename}.${
                taxFile.mimetype.split("/")[1]
              }`,
              request_id: create_request.id,
              upload_by_id: tax.upload_by_id,
              upload_at: tax.upload_at,
            },
          });
        }
      }

      if (
        becomeSupplier.business_files &&
        becomeSupplier.business_files.length > 0
      ) {
        const business_license = {
          upload_by_id: becomeSupplier.user_id,
          file_url: `/upload/user/${becomeSupplier.user_id}/evidence/license`,
          file_type: becomeSupplier.type_service,
          upload_at: new Date(),
        };

        for (let businessFile of becomeSupplier.business_files) {
          const url = `${business_license.file_url}/${businessFile.filename}.${
            businessFile.mimetype.split("/")[1]
          }`;

          await FileService.uploadFile(businessFile, business_license.file_url);

          const create_business_license = await prisma.document_supplier.create(
            {
              data: {
                file_type: "pdf",
                file_url: url,
                request_id: create_request.id,
                upload_by_id: business_license.upload_by_id,
                upload_at: business_license.upload_at,
                
              },
            }
          );
        }
      }


        setImmediate(()=>{
          const emailService = new EmailService()
        })
      });
      
      if(!checkIsDone){
        throw error("Lỗi trong quá trình thực thi",error)
      }

      return {
        status:200,
        message:"Gửi yêu cầu thành công",
        success:true
      };
    } catch (error) {
      console.error('error',error)
      throw Error("Không thể gửi yêu cầu vui lòng thử lại")
    }
  }

  static async handleFavorite(user_id:string, service_id:string): Promise<{success:boolean,message:string,status:number}> {
    if (!user_id || !service_id) {
      throw new Error("Chưa có dữ liệu đầu vào");
    }

    const service = await prisma.service.findFirst({
      where: { id: service_id, status_id: StatusType.ACTIVE },
      select: { id: true },
    });

    console.log(service)

    const person = await prisma.person.findUnique({
      where: { id: user_id },
      select: { id: true },
    });

    console.log(person)

    if (!person || !service) {
      throw new Error("Không có người dùng hay dịch vụ tồn tại");
    }

    const result = await prisma.$transaction(async (tx) => {
      const isExist = await tx.favorite.findFirst({
        where: { user_id: user_id, service_id: service_id },
      });

      if (isExist) {
        await tx.favorite.delete({
          where: { id: isExist.id },
        });

        return {
          success: true,
          message: "Hoàn thành hủy yêu thích",
          status: 200,
        };
      }

      await tx.favorite.create({
        data: {
          service_id: service_id,
          user_id: user_id,
        },
      });

      return {
        success: true,
        message: "Thêm yêu thích thành công",
        status: 200,
      };
    });

    return result;
  }

  static async booking(user_id:string,service_id:string){
    
    

  }


}
