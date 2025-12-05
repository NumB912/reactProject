
import { Image } from "../image";
import { Service } from "../Service";
import { location } from "../location";
import { amenity } from "../amenity";
import { AmenityHotel } from "./amenityHotel";
import { room } from "./room/room";

export interface Hotel extends Service {
  id: string;
  service_name: string;
  total_reviews: number;
  imageServices: Image[];
  amenities_hotels: AmenityHotel[];
  typeHotel: HotelType | null;
  serviceItems:room[]
}

export interface HotelType {
  id: string;
  type: string;
}
