export interface EditProfileDTO {
  id: string;
  name?: string;
  phone?: string;
  bio?: string;
  tax_code?:string;
  avatarFile?: Express.Multer.File;
  wallpaperFile?: Express.Multer.File;
  status?:string,
}

