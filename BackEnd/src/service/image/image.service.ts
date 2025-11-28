import prisma from "@/db";
import type { Image, Prisma } from "@prisma/client";
import fileService from "../file.service";
export class ImageService {
static async addImages(
  uploadedFiles: { url: string }[],
  tx: Prisma.TransactionClient
): Promise<{ id: string; url: string|null }[]> {
  const createdImages = [];

  for (const file of uploadedFiles) {
    const created = await tx.image.create({
      data: { url: file.url },
      select: { id: true, url: true },
    });

    createdImages.push(created);
  }

  return createdImages;
}


 static async deleteImages(
    images: string[],
    tx: Prisma.TransactionClient
  ) {
    if (!images?.length) {
      return { success: true, deleted: 0 };
    }

    try {
      const findImageMany = await tx.image.findMany({
        where:{
          id:{in:images}
        },
        select:{
          id:true,
          url:true,
        }
      })

      const deleted_image_ids = await tx.image.deleteMany({
        where: { id: { in: images } },
      });


      for (const img of findImageMany) {
        if (!img.url) continue;

        try {
          await fileService.deleteFile(img.url);
        } catch (err: any) {
          if (err.code !== "ENOENT") {
            console.warn(`Lỗi khi xóa file ${img.url}:`, err.message);
          }
        }
      }

      return {
        success: true,
        deleted: deleted_image_ids.count,
        message: `Đã xóa thành công ${deleted_image_ids.count} ảnh`,
      };
    } catch (err: any) {
      console.error("Lỗi khi xóa ảnh:", err);
      throw new Error(`Xoá ảnh thất bại: ${err.message}`);
    }
  }
}
