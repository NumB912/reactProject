export interface Travel {
  id: number | string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  reviews?: number;
}

export interface Banner {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link?: string;
}