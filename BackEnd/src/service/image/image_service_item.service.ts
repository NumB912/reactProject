import type { Image, Prisma } from "@prisma/client";
import fileService from "../file.service";
import { ImageService } from "./image.service";
import { count } from "console";

export class ImageServiceItem {
  static async addImages(
    url: string,
    fileImages: Express.Multer.File[],
    service_item_id: string,
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

      const result = await tx.imageServiceItem.createMany({
        data: createdImages.map((img) => ({
          image_id: img.id,
          service_item_id,
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
    service_item_id: string
  ) {

    console.log(images)

    if (!images?.length) return { success: true };

    const imageList = await tx.image.findMany({
      where: { id: { in: images } },
      select: { id: true, url: true },
    });

    await tx.imageServiceItem.deleteMany({
      where: {
        image_id: { in: images },
        service_item_id: service_item_id,
      },
    });

    const delete_image = await tx.image.deleteMany({
      where: { id: { in: images } },
    });

    for (const img of imageList) {
      if (img.url) {
        try {
          await fileService.deleteFile(img.url);
        } catch (err: any) {
          if (err.code !== "ENOENT") {
            console.warn(`Lỗi khi xóa file ${img.url}:`, err.message);
          }
        }
      }
    }

    return {
      success: true,
      deleted: delete_image.count,
    };
  }
}
