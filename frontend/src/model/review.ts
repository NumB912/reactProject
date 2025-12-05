import { Image } from "./image";
import { User } from "./user";

export interface Review extends postPhoto {
  title?: string;
  rating?: number;
  comment?: string;
  goWith?: "Family" | "Friends" | "Only" | "Business" | "Couple";
}

export interface postPhoto {
  serviceID: string;
  id: string;
  images: Image[];
  user: User;
  createAt: Date;
}
