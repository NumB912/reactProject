// import type { Request } from "express";
// import fs from "fs-extra";
// import path from "path";
// import { fileURLToPath } from "url";

// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

// class FileService {
//   private readonly baseDir: string;

//   constructor() {
//     this.baseDir = path.resolve(dirname, "../../public");
//     fs.ensureDirSync(this.baseDir);
//   }
//   private getSafePath(relativePath: string): string {
//     const fullPath = path.resolve(this.baseDir, relativePath.replace(/^\/+/, ""));
//     if (!fullPath.startsWith(this.baseDir + path.sep)) {
//       throw new Error("Đường dẫn không hợp lệ (path traversal detected)");
//     }
//     return fullPath;
//   }

//   async uploadFile(
//     file: Express.Multer.File,
//     customPath: string | ((file: Express.Multer.File, req?: Request) => string) = "",
//     req?: Request
//   ): Promise<{ url: string; description: string }> {
//     try {
//       let targetFolder: string;

//       if (typeof customPath === "function") {
//         const result = customPath(file, req);
//         targetFolder = this.getSafePath(result || "");
//       } else {
//         targetFolder = this.getSafePath(customPath);
//       }

//       await fs.ensureDir(targetFolder);

//       const ext = path.extname(file.originalname);
//       const fileName = `${file.filename}${ext}`;
//       const finalPath = path.join(targetFolder, fileName);

//       await fs.move(file.path, finalPath, { overwrite: true });

//       const publicUrl = path
//         .relative(this.baseDir, finalPath)
//         .replace(/\\/g, "/")
//         .replace(/^(\.\.\/)+/, "");

//       return {
//         url: `/${publicUrl}`,
//         description: `${file.originalname} - ${new Date().toLocaleString("vi-VN")}`,
//       };
//     } catch (error: any) {
//       console.error("Lỗi upload file:", error);
//       throw new Error("Không thể lưu file: " + error.message);
//     }
//   }

//   async deleteFile(fileUrl: string): Promise<void> {
//     if (!fileUrl || typeof fileUrl !== "string") {
//       console.warn("deleteFile: URL không hợp lệ");
//       return;
//     }

//     try {
//       const cleanUrl = fileUrl.startsWith("/") ? fileUrl.slice(1) : fileUrl;
//       const filePath = this.getSafePath(cleanUrl);

//       if (await fs.pathExists(filePath)) {
//         await fs.remove(filePath);
//         console.log("Đã xóa file:", filePath);
//       } else {
//         console.info("File không tồn tại:", filePath);
//       }
//     } catch (error: any) {
//       console.error("Lỗi xóa file:", error.message);
//       throw new Error("Không thể xóa file");
//     }
//   }

//   async uploadMultipleFiles(
//     files: Express.Multer.File[],
//     customPath?:
//       | string
//       | ((file: Express.Multer.File, index: number, req?: Request) => string),
//     req?: Request
//   ): Promise<{ url: string; description?: string }[]> {
//     if (!Array.isArray(files) || files.length === 0) return [];

//     const results = await Promise.all(
//       files.map(async (file, i) => {
//         try {
//           let targetFolder: string;

//           if (typeof customPath === "function") {
//             const result = customPath(file, i, req);
//             targetFolder = this.getSafePath(result || "");
//           } else {
//             targetFolder = this.getSafePath(customPath || "");
//           }

//           await fs.ensureDir(targetFolder);

//           const ext = path.extname(file.originalname);
//           const fileName = `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 8)}${ext}`;
//           const finalPath = path.join(targetFolder, fileName);

//           await fs.move(file.path, finalPath, { overwrite: true });

//           const publicUrl = path.relative(this.baseDir, finalPath).replace(/\\/g, "/");

//           return {
//             url: `/${publicUrl}`,
//             description: `${file.originalname} - ${new Date().toLocaleString("vi-VN")}`,
//           };
//         } catch (error: any) {
//           return {
//             url: "",
//             description: `Lỗi: ${file.originalname} - ${error.message}`,
//           };
//         }
//       })
//     );

//     return results;
//   }
// }

// export default new FileService();

import type { Request } from "express";
import fs from "fs-extra";
import path from "path";

class FileService {
  private readonly baseDir: string;

  constructor() {
    // Không dùng import.meta.url → Jest bị lỗi
    // Dùng process.cwd() để trỏ đến thư mục gốc project
    this.baseDir = path.resolve(process.cwd(), "public");
    fs.ensureDirSync(this.baseDir);
  }

  private getSafePath(relativePath: string): string {
    const fullPath = path.resolve(this.baseDir, relativePath.replace(/^\/+/, ""));
    if (!fullPath.startsWith(this.baseDir + path.sep)) {
      throw new Error("Đường dẫn không hợp lệ (path traversal detected)");
    }
    return fullPath;
  }

  async uploadFile(
    file: Express.Multer.File,
    customPath: string | ((file: Express.Multer.File, req?: Request) => string) = "",
    req?: Request
  ): Promise<{ url: string; description: string }> {
    try {
      let targetFolder: string;

      if (typeof customPath === "function") {
        const result = customPath(file, req);
        targetFolder = this.getSafePath(result || "");
      } else {
        targetFolder = this.getSafePath(customPath);
      }

      await fs.ensureDir(targetFolder);

      const ext = path.extname(file.originalname);
      const fileName = `${file.filename}${ext}`;
      const finalPath = path.join(targetFolder, fileName);

      await fs.move(file.path, finalPath, { overwrite: true });

      const publicUrl = path
        .relative(this.baseDir, finalPath)
        .replace(/\\/g, "/")
        .replace(/^(\.\.\/)+/, "");

      return {
        url: `/${publicUrl}`,
        description: `${file.originalname} - ${new Date().toLocaleString("vi-VN")}`,
      };
    } catch (error: any) {
      console.error("Lỗi upload file:", error);
      throw new Error("Không thể lưu file: " + error.message);
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl || typeof fileUrl !== "string") {
      console.warn("deleteFile: URL không hợp lệ");
      return;
    }

    try {
      const cleanUrl = fileUrl.startsWith("/") ? fileUrl.slice(1) : fileUrl;
      const filePath = this.getSafePath(cleanUrl);

      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        console.log("Đã xóa file:", filePath);
      } else {
        console.info("File không tồn tại:", filePath);
      }
    } catch (error: any) {
      console.error("Lỗi xóa file:", error.message);
      throw new Error("Không thể xóa file");
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    customPath?:
      | string
      | ((file: Express.Multer.File, index: number, req?: Request) => string),
    req?: Request
  ): Promise<{ url: string; description?: string }[]> {
    if (!Array.isArray(files) || files.length === 0) return [];

    const results = await Promise.all(
      files.map(async (file, i) => {
        try {
          let targetFolder: string;

          if (typeof customPath === "function") {
            const result = customPath(file, i, req);
            targetFolder = this.getSafePath(result || "");
          } else {
            targetFolder = this.getSafePath(customPath || "");
          }

          await fs.ensureDir(targetFolder);

          const ext = path.extname(file.originalname);
          const fileName = `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 8)}${ext}`;
          const finalPath = path.join(targetFolder, fileName);

          await fs.move(file.path, finalPath, { overwrite: true });

          const publicUrl = path.relative(this.baseDir, finalPath).replace(/\\/g, "/");

          return {
            url: `/${publicUrl}`,
            description: `${file.originalname} - ${new Date().toLocaleString("vi-VN")}`,
          };
        } catch (error: any) {
          return {
            url: "",
            description: `Lỗi: ${file.originalname} - ${error.message}`,
          };
        }
      })
    );

    return results;
  }
}

export default new FileService();
