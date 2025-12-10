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

router.post(
   "/services",
      upload.fields([
    {
      name: "imageFiles",
    },
  ]),
  authMiddleware,
  RoleMiddleware(Role.ROLE_SUPPLIER),
  managementServiceController.addService
);

router.put(
  "/services",
      upload.fields([
    {
      name: "imageFiles",
    },
  ]),
  authMiddleware,
  RoleMiddleware(Role.ROLE_SUPPLIER),
  managementServiceController.updateService
);


router.get(
  "/",
  authMiddleware,
  RoleMiddleware(Role.ROLE_SUPPLIER),
  managementServiceController.getServices
);

router.get(
  "/service_detail",
  authMiddleware,
  RoleMiddleware(Role.ROLE_SUPPLIER),
  managementServiceController.getServiceDetail
);


// router.post('/add-service',managementServiceController.addService)

router.post(
  "/",
  upload.fields([
    {
      name: "imageFiles",
    },
  ]),
  authMiddleware,
  RoleMiddleware(Role.ROLE_SUPPLIER),
  ManagementServiceItemController.addServiceItem
);
router.put(
  "/",
  upload.fields([
    {
      name: "imageFiles",
    },
  ]),
  authMiddleware,
  RoleMiddleware(Role.ROLE_SUPPLIER),
  ManagementServiceItemController.updateServiceItem
);

export default router;
