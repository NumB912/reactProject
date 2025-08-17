import { Image } from "./image";


export interface User {
  userID: string;
  userName: string;   
  name: string;      
  email: string;    
  phone?: string;
  address?: string;
  avatar?: Image;     
  wallpaper?: Image;  
}