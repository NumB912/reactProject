import type { ServiceType } from "@/enum/service/type.service.enum";
export interface BecomeSupplierDTO {
  user_id: string;
  property_name: string;
  type_service: ServiceType;
  lcg: string;
  lat: number;
  lng: number;
  ward_id: string;
  // account_number: string;
  // account_holder: string;
  tax_code: string;
  tax_files?: Express.Multer.File[];
  business_files?: Express.Multer.File[];
}