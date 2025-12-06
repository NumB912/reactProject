import type { Prisma } from "@prisma/client";
import fileService from "../file.service";
import { ImageService } from "./image.service";
export class Image_service_Service {

static async addImages(
    url: string,
    fileImages: Express.Multer.File[],
    service_id: string,
    tx: Prisma.TransactionClient
  ) {
    try {
      const createdImages = [];

      for (const file of fileImages) {
        const uploaded = await fileService.uploadFile(file, url);

        const image = await tx.image.create({
          data: {
            url: `${uploaded.url}`,
          },
          select: { id: true, url: true },
        });

        createdImages.push(image);
      }

      const result = await tx.imageService.createMany({
        data: createdImages.map((img) => ({
          image_id: img.id,
          service_id,
        })),
      });

      return {
        count:result.count,
        createdImages
      };
    } catch (error) {
      console.error("Error addImages:", error);
      throw error;
    }
  }
static async deleteImages(
  images: string[],
  tx: Prisma.TransactionClient,
  service_id: string
) {
  if (!images?.length) return { success: true, deleted: 0 };

  try {
    await tx.imageService.deleteMany({
      where: {
        service_id:service_id,
        image_id: { in: images },
      },
    });

    const findImages = await tx.image.findMany({
      where: { id: { in: images } },
      select: { id: true, url: true },
    });

    for (const img of findImages) {
      if (!img.url) continue;
      try {
        await fileService.deleteFile(img.url);
      } catch (err: any) {
        if (err.code !== "ENOENT") {
          console.warn(`Lỗi khi xóa file ${img.url}:`, err.message);
        }
      }
    }

    const deletedImages = await tx.image.deleteMany({
      where: { id: { in: images } },
    });

    return {
      success: true,
      deleted: deletedImages.count,
      message: `Đã xóa ${deletedImages.count} ảnh của service_item ${service_id}`,
    };
  } catch (err: any) {
    console.error("Lỗi khi xóa ảnh service_item:", err);
    throw new Error(`Xóa ảnh thất bại: ${err.message}`);
  }
}

}
