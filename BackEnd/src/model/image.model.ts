interface Image{
    id: number;
    url: string;
    description: string;
}

interface ImageServices{
    id: number;
    service_id: number;
    image_id: number;
    image: Image;
}

interface ImageRooms{
    id: number;
    room_id: number;
    image_id: number;
    image: Image;
}