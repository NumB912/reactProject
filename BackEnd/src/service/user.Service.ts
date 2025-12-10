import prisma from "../db";
import FileService from "./file.service";
import { ServiceType } from "@/enum/service/type.service.enum";
import { StatusBecomeSupplier } from "@/enum/status.become.supplier.enum";
import type { EditProfileDTO } from "@/model/user/edit.profile_DTO.model";
import type { BecomeSupplierDTO } from "@/model/user/becomeSuplier_DTO.model";
import factoryServiceCreator from "./factory/factory.service.creator";
import { EmailService } from "./email.Service";
import { isValidUUID } from "@/utils/isvalidateUuid.utils";
import { error } from "console";
import { StatusType } from "@/enum/service/status.service.enum";
import type { Service } from "@prisma/client";
import type { SuccessResponse, ErrorResponse } from "@/model/api.model";

export class userService {
static async getAllUsers(
  filters: {
    search?: string;
    role?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}
) {
  const {
    search,
    role,
    page = 1,
    limit = 10,
    sortBy = 'name',
    sortOrder = 'asc'
  } = filters;

  const skip = (page - 1) * limit;

  // Build search conditions
  const where: any = {};
  
  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        phone: {
          contains: search,
        },
      },
    ];
  }

  if (role) {
    where.role = {
      name: {
        equals: role,
        mode: 'insensitive',
      },
    };
  }

  const total = await prisma.person.count({ where });
  const users = await prisma.person.findMany({
    where,
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
      create_at: true,
      update_at: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
  static async findOne(id: string) {
    return await prisma.person.findFirst({
      where:{
        id:id,
      },
      select: {
        id: true,
        bio: true,
        phone: true,
        name: true,
        image: {
          select: {
            url: true,
          },
        },
        // wallpaper: {
        //   select: {
        //     url: true,
        //   },
        // },


      },
    });
  }




  static async editProfile(
    profile: EditProfileDTO
  ): Promise<SuccessResponse<any>|ErrorResponse> {
    try {
      const data: any = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
      };


      const avatarFile = profile.avatarFile;
      const wallpaperFile = profile.wallpaperFile;

      if (!isValidUUID(profile.id)) {
        return {
          success: false,
          message: "Không tồn tại người dùng",
          status: 400,
        };
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

      if (!person) {
        return {
          success: false,
          message: "Không tồn tại người dùng",
          status: 400,
        };
      }

      const prismaTransaction = await prisma.$transaction(async (tx) => {
        if (profile.avatarFile && profile.avatarFile.size > 0) {
          const avatar = {
            url: `/upload/user/${profile.id}/avatar/`,
            description: "User avatar",
          };
          const file = await FileService.uploadFile(profile.avatarFile, avatar.url);
          const avatarCreate = await prisma.image.create({
            data: {
              url:
               file.url,
              description: "User avatar",
            },
          });
          data.image_id = avatarCreate.id;
        }

        // if (profile.wallpaperFile && profile.wallpaperFile.size > 0) {
        //   const wallpaper = {
        //     url: `/upload/user/${profile.id}/wallpaper/`,
        //     description: "User wallpaper",
        //   };
        //   await FileService.uploadFile(profile.wallpaperFile, wallpaper.url);
        //   const wallpaperCreate = await prisma.image.create({
        //     data: {
        //       url:
        //         wallpaper.url +
        //         profile.wallpaperFile.filename +
        //         "." +
        //         profile.wallpaperFile.mimetype.split("/")[1],
        //       description: "User wallpaper",
        //     },
        //   });
        //   data.wallpaper_id = wallpaperCreate.id;
        // }

        const updated = await tx.person.update({
          where: { id: profile.id },
          data: data,
          select:{
            image:true,
            name:true,
            email:true,
            phone:true,
            bio:true
          }
        });

        setImmediate(async () => {
          try {
            if (avatarFile && person?.image_id) {
              await prisma.image.delete({ where: { id: person?.image_id } });
              await FileService.deleteFile(person.image?.url || "");
            }
            if (wallpaperFile && person?.wallpaper_id) {
              await prisma.image.delete({ where: { id: person.wallpaper_id } });
              await FileService.deleteFile(person.wallpaper?.url || "");
            }
          } catch (err) {
            console.warn("Cleanup old files failed:", err);
          }
        });

        return updated;
      });

      return {
        data:prismaTransaction,
        success: true,
        message: "Cập nhật thông tin người dùng thành công",
        status: 200,
      };
    } catch (error) {
      return {
        success: false,
        message: "Cập nhật thông tin người dùng thành công",
        status: 200,
      };
    }
  }

static async becomeSupplier(
  becomeSupplier: BecomeSupplierDTO
): Promise<{ success: boolean; message: string; status: number }> {
  try {
    let checkIsDone = {} as any;

  const find = await prisma.request_become_supplier.findUnique({
        where:{
          user_id:becomeSupplier.user_id
        }
      })

      if(find){
        return {
          success:false,
          status:400,
          message:"Người dùng đã tạo rồi không được tạo lại nữa",
        }
      }

    const transaction = await prisma.$transaction(async (tx) => {
      const locationCreated = await tx.location.create({
        data: {
          ward_id: becomeSupplier.ward_id,
          lat: becomeSupplier.lat,
          lng: becomeSupplier.lng,
          location: becomeSupplier.lcg,
        },
      });

      let serviceId: string;

      const create_request = await tx.request_become_supplier.create({
        data: {
          name: "service",
          company_name: becomeSupplier.property_name,
          status: StatusBecomeSupplier.PENDING,
          user_id: becomeSupplier.user_id,
          tax_code: becomeSupplier.tax_code,
          location_id:locationCreated.id,
          create_at: new Date()
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
          const file = await FileService.uploadFile(taxFile, tax.file_url);
          const create_tax_file = await tx.document_supplier.create({
            data: {
              file_type: tax.file_type,
              file_url: file.url,
              request_id: create_request.id,
              upload_by_id: tax.upload_by_id,
              upload_at: tax.upload_at,
            },
          });
        }
      }


      if (becomeSupplier.business_files && becomeSupplier.business_files.length > 0) {
        const business_license = {
          upload_by_id: becomeSupplier.user_id,
          file_url: `/upload/user/${becomeSupplier.user_id}/evidence/license`,
          file_type: becomeSupplier.type_service,
          upload_at: new Date(),
        };

        for (let businessFile of becomeSupplier.business_files) {
          const url = `${business_license.file_url}/${
            businessFile.filename
          }.${businessFile.mimetype.split("/")[1]}`;

          const file = await FileService.uploadFile(businessFile, business_license.file_url);

  
          const create_business_license = await tx.document_supplier.create({
            data: {
              file_type: business_license.file_type,
              file_url: file.url,
              request_id: create_request.id, 
              upload_by_id: business_license.upload_by_id,
              upload_at: business_license.upload_at,
            },
          });
        }
      }

      return { create_request };
    });

    // Gửi email sau khi transaction thành công
    setImmediate(() => {
      const emailService = new EmailService();
      // Gửi email thông báo
    });

    if (!transaction) {
      throw new Error("Lỗi trong quá trình thực thi");
    }

    return {
      status: 200,
      message: "Gửi yêu cầu thành công",
      success: true,
    };
  } catch (error) {
    console.error("error", error);
    throw new Error("Không thể gửi yêu cầu vui lòng thử lại");
  }
}

static async getRequestSupplier(id:string){
    try{

      const getRequest = await prisma.request_become_supplier.findUnique({
        where:{
          user_id:id
        }
      })

      return {
        success:true,
        data:getRequest,
        message:"Lấy thành công thông tin người dùng",
        status:200,
      }
    }catch(error){
      return {
        success: false,
        message: "Lỗi server",
        status: 500,
      };
    }
}

  static async handleFavorite(
    user_id: string,
    service_id: string
  ): Promise<{ success: boolean; message: string; status: number }> {
    if (!user_id || !service_id) {
      throw new Error("Chưa có dữ liệu đầu vào");
    }

    const service = await prisma.service.findFirst({
      where: { id: service_id, status_id: StatusType.ACTIVE },
      select: { id: true },
    });


    const person = await prisma.person.findUnique({
      where: { id: user_id },
      select: { id: true },
    });

    console.log(person);

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

  static async booking(user_id: string, service_id: string) {}
}
