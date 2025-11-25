import { ServiceType } from "@/enum/service/type.service.enum";
import { BaseService } from "@/service/service/base.service";
import { HotelService } from "@/service/service/hotel.service";
import { ThingToDoService } from "@/service/service/tour.service";


export class serviceController{

    static async getServiceList(req: any, res: any) {
        try {

            const services = await ThingToDoService.getInstance().getListServices(ServiceType.THING_TO_DO);
            return res.json({
                services
            })
        }
        catch (error) {
            console.error("Lỗi khi lấy danh sách dịch vụ:", error);
            return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau." });
        }
    }

}