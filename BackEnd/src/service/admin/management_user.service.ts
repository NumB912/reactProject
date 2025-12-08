import prisma from "@/db";
import type { EditProfileDTO } from "@/model/user/edit.profile_DTO.model";

export class ManagementUserService {
  static async updateStatus(profile:EditProfileDTO) {
    try {
      if (!profile || !profile.status || !profile.id) {
        return {
          message: "Thieu thong tin",
          status: 400,
        };
      }

      const update = await prisma.person.update({
        where: {
          id: profile.id,
        },
        data: {
          status: profile.status,
          bio:profile.bio,
          phone:profile.phone,
          name:profile.name,
        },
      });

      return {
        data: update,
        message: "Update thanh cong",
        status: 200,
      };
    } catch (error) {
      return {
        message: "Khong thanhf cong",
        status: 500,
      };
    }
  }

      static async userDetail(id: string) {
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
        email:true,
        role:true,
        status:true,
      },
    });
  }


}
