export interface Travel {
  id: number | string;
  service_name: string;
  description: string;
  imageServices: {url:string}[];
  rating?: number;
  total_reviews?: number;
}

export interface Banner {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link?: string;
}