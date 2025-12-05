import { Contact } from "./contact";
import { Image } from "./image";
import { location } from "./location";
import { postPhoto, Review } from "./review";

export type ServiceStatus = 'active' | 'inactive' | 'pending' | 'deleted';

export interface Service {
  id: string;
  serviceName: string;
  rating: number;
  totalReviews: number;
  description?: string | null;
  statusId: string;
  status?: { id: string; name: string };
  info?: string;
  quantityRoom?: number | null;
  price_from: string;
  price_to: string;
  location: location;
  service_item:
}