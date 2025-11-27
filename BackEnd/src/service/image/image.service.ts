import prisma from "@/db";
import type { Image } from "@prisma/client";
import fileService from "../file.service";
export class ImageService {
  static async addImages(url: string, fileImages: Express.Multer.File[]) {
    const imageServicesTemp = [];
    if (fileImages && fileImages.length > 0) {
      for (let image of fileImages) {
        await fileService.uploadFile(image, url);

        const createImage = await prisma.image.create({
          data: {
            url: `${url}/${image.filename}.${image.mimetype.split("/")[1]}`,
          },

          select: {
            id: true,
          },
        });
        imageServicesTemp.push(createImage);
      }
    }

    return imageServicesTemp;
  }

  static async deleteImages(image_ids: string[]) {
    if (!image_ids || image_ids.length === 0) {
      return { success: true, deleted: 0 };
    }
    const validIds = image_ids
      .map((id) => String(id).trim())
      .filter((id) => id.length > 0);

    if (validIds.length === 0) {
      return { success: false, message: "Không có ID hợp lệ để xóa" };
    }

    return await prisma.$transaction(async (tx) => {
      const images = await tx.image.findMany({
        where: {
          id: { in: validIds },
        },
        select: { id: true, url: true },
      });

      await tx.imageService.deleteMany({
        where: {
          image_id: { in: validIds },
        },
      });
      
      const deleteResult = await tx.image.deleteMany({
        where: {
          id: { in: validIds },
        },
      });

      for (const image of images) {
        try {
          if (image.url) {
            await fileService.deleteFile(image.url);
          }
        } catch (err: any) {
          if (err.code !== "ENOENT") {
            console.warn(`Lỗi xóa file ${image.url}:`, err.message);
          }
        }
      }

      console.log(`Đã xóa ${deleteResult.count} ảnh thành công (DB + file)`);

      return {
        success: true,
        deleted: deleteResult.count,
        message: `Xóa thành công ${deleteResult.count} ảnh`,
      };
    });
  }
}
