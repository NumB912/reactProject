import { Image } from "./image";

export interface ServiceItem {
  id: string;                
  price?: number | null;        
  name?: string | null;
  service_id?: string | null;    
  availiable_from?: string | null; 
  availiable_to?: string | null;  
  imageServiceItems:Image[]
}