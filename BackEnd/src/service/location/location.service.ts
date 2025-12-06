import prisma from "@/db";
import type { Prisma } from "@prisma/client";

export class LocationService {
  static async Getprovince(q: string) {
    try {
      let where: Prisma.ProvinceWhereInput = {};
      if (q.length > 0) {
        where.OR = [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            nameEn: {
              contains: q,
              mode: "insensitive",
            },
          },
        ];
      }
      const province = await prisma.province.findMany({
        where,
        select: {
          code: true,
          codeName: true,
          fullName: true,
          fullNameEn: true,
          name: true,
          nameEn: true,
        },
      });

      return {
        data: province,
        message: "Láy dữ liệu thành công",
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Lỗi dữ liệu",
      };
    }
  }

  static async searchLLocation(q: string) {
    try {
      let where: Prisma.ProvinceWhereInput = {};
      let whereWard: Prisma.WardWhereInput = {};
      if (q.length > 0) {
        where.OR = [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            nameEn: {
              contains: q,
              mode: "insensitive",
            },
          },
        ];

        whereWard.OR = [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            nameEn: {
              contains: q,
              mode: "insensitive",
            },
          },
        ];
      }

      const provinces = await prisma.province.findMany({
        where,
        select: {
          code: true,
          codeName: true,
          fullName: true,
          fullNameEn: true,
          name: true,
          nameEn: true,
        },
        take:3
      });

      const wards = await prisma.ward.findMany({
        where:{
          ...whereWard
        },
        select:{
           code: true,
          codeName: true,
          fullName: true,
          fullNameEn: true,
          name: true,
          nameEn: true,
          province:{
            select:{
              fullName:true,
            }
          }
        },
        take:3
      });

      return {
        provinces,
        wards
        ,
        message: "Láy dữ liệu thành công",
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Lỗi dữ liệu",
      };
    }
  }

  static async GetWard(id: string) {
    try {
      const ward = await prisma.ward.findMany({
        where: {
          province_code: id,
        },
        select: {
          code: true,
          codeName: true,
          fullName: true,
          fullNameEn: true,
          name: true,
          nameEn: true,
        },
      });

      return {
        data: ward,
        message: "Láy dữ liệu thành công",
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Lỗi dữ liệu",
      };
    }
  }
}
