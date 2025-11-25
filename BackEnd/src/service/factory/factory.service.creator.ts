import { ServiceType } from "@/enum/service/type.service.enum";
import { HotelServiceCreator, RentalCarServiceCreator, ThingToDoServiceCreator, } from "./service.creator";

class FactoryServiceCreator{

    async factory(type_service:ServiceType){

        switch(type_service){
            case ServiceType.THING_TO_DO:
                return new ThingToDoServiceCreator()
            case ServiceType.HOTEL:
                return new HotelServiceCreator()
            case ServiceType.RENTAL_CAR:
                return new RentalCarServiceCreator()
        }

    }


}

export default new FactoryServiceCreator()