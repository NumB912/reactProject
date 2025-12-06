import { Service } from "../../Service";

export interface BookingRoom{
    user_id:string,
    name:string,
    email:string,
    phone:string,
    total_amount:number,
    check_in:Date,
    check_out:Date,
    service:Service;
    quantity:number,
    adult:number,
    children:number,
    booking_type_id:string,
}