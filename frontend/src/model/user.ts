import { status } from "../enum/status_user";
import { Image } from "./image";


export interface User {
  id: string;  
  name: string;      
  email: string;    
  phone?: string;
  address?: string;
  avatar?: Image;     
  wallpaper?: Image;  
  role?:Role,
  create_at:string,
  status:status,
  bio:string
  role_id?:string
}

export interface Role{
  id:string,
  name:string
  description:string
}