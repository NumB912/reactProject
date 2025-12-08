import prisma from "@/db";
import { Role } from "@/enum/role.enum";
import { StatusType } from "@/enum/service/status.service.enum";
import { StatusBecomeSupplier } from "@/enum/status.become.supplier.enum";
import { status } from "@/enum/user.enum";
import { BadRequestError, NotFoundError } from "@/model/error/error";
import type { EditProfileDTO } from "@/model/user/edit.profile_DTO.model";
import type { Prisma } from "@prisma/client";

 class ManagementSupplierService {
  static async getSuppliers() {
    try {
        const suppliers = await prisma.person.findMany({
            where:{
                role_id:Role.ROLE_SUPPLIER,
                status:status.ACTIVE,
            },

            select:{
                email:true,
                name:true,
                phone:true,
                id:true,
                _count:{
                    select:{
                        services:true
                    }
                },
                Request_become_supplier:{
                    select:{
                        company_name:true,
                    }
                },
                create_at:true,
                update_at:true,
                status:true,

            },
            
        
        })

      return {
        data: suppliers,
        message: "Lấy thành công",
        status: 200,
      };
    } catch (error) {
      return {
        message: "Lấy thành công",
        status: 500,
      };
    }
  }



  static async getSuppliersDetail(id: string) {
    try{

      if(!id){
        return {
          message:"Lỗi không có id",
          status:400,
        }
      }

      const detailSupplier =  await prisma.person.findFirst({
      where:{
        id:id,
        role_id:Role.ROLE_SUPPLIER
      },
      select: {
        id: true,
        phone: true,
        name: true,
        bio:true,
        image: {
          select: {
            url: true,
          },
        },
        Document_supplier:{
          select:{
            file_url:true,
            id:true,
            file_type:true,
          }
        },
        Request_become_supplier:{
          select:{
            tax_code:true,
            name:true,
            company_name:true,
            create_at:true,
            location:{
              select:{
                location:true,
                ward:{
                  select:{
                    fullName:true,
                    province:{
                      select:{
                        fullName:true,
                      }
                    }
                  }
                }
              }
            },
            proccess_at:true,
          }          
        },
        services:{
          select:{
            type_service:{
              select:{
                id:true,
                type:true,
              }
            }, 
            status_service:{
              select:{
                statusService:true,
              }
            },
            price_from:true,
            price_to:true,
            service_name:true,
            imageServices:{
              select:{
                image:{
                  select:{
                    url:true,
                  }
                }
              }
            },
            createdAt:true,
            updatedAt:true,
          }
        },
        email:true,
        role:true,
        status:true,
      },
    });


    return {
      data:detailSupplier,
      message:"Thành công lấy dữ liệu",
      status:200,
    }
    }catch(err){
      return {
        message:"Lỗi trong quá trình lấy supplier",
        status:500
      }
    }
  }


}
export default ManagementSupplierService