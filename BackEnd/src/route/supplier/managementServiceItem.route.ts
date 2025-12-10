import { Router } from "express";
import { managementServiceController } from "@/controller/supplier/management_service.controller";
import multer from "multer";
import { authMiddleware } from "@/middleware/auth.token.middleware";
import { RoleMiddleware } from "@/middleware/role.middleware";
import { Role } from "@/enum/role.enum";
import { ManagementServiceItem } from "@/service/management-service-item.ts/management_service_item.service";
import { ManagementServiceItemController } from "@/controller/supplier/management_service_item.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get('/service-items',)

export default router;
