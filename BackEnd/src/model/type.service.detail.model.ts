
import type { TypeHotel, AmenityHotel, ImageService, ServiceItem,Location, AmenitiesRooms, AmenitiesCars, ServiceItemServiceOccassion, ServiceItemOff, StatusServiceItem, Service, } from '@prisma/client';

export type ServiceDetail = Service & {
  typeHotels?: TypeHotel[];
  amenities_hotels?: AmenityHotel[]
  imageServices: ImageService[];
  serviceItems: (ServiceItem & {
    amenitiesRooms?: AmenitiesRooms[];    
    amenitiesCars?: AmenitiesCars[];
    imagesRooms?: ImageRooms[];
    serviceItemOccasions?: ServiceItemServiceOccassion[];
    serviceItemOffs?: ServiceItemOff[];
    status?: StatusServiceItem;
  })[];
};