import { Service } from "../Service";
import { ServiceItem } from "../service_item";

export interface Tour extends ServiceItem{
    service:Service;

}