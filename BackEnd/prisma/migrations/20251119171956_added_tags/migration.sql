-- CreateTable
CREATE TABLE "Person" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "location_id" VARCHAR(100),
    "phone" VARCHAR(20),
    "image_id" UUID,
    "role_id" VARCHAR(50) NOT NULL,
    "create_at" TIMESTAMPTZ(6),
    "update_at" TIMESTAMPTZ(6),
    "google_id" VARCHAR,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" BIGSERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "parentId" BIGINT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "replacedBy" BIGINT,
    "ip" TEXT,
    "ua" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionRole" (
    "id" TEXT NOT NULL,
    "role_id" VARCHAR(50) NOT NULL,
    "permission_id" TEXT NOT NULL,

    CONSTRAINT "PermissionRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" UUID NOT NULL,
    "bank_name" TEXT,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_account" (
    "id" UUID NOT NULL,
    "bank_account" TEXT,
    "account_holder" TEXT,
    "bank_id" UUID,
    "person_id" UUID,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeService" (
    "id" BIGINT NOT NULL,
    "type" TEXT,

    CONSTRAINT "TypeService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusService" (
    "id" BIGINT NOT NULL,
    "status" TEXT,

    CONSTRAINT "StatusService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" UUID NOT NULL,
    "service_name" TEXT,
    "supplier_id" UUID,
    "rating" DECIMAL,
    "total_reviews" BIGINT,
    "status_id" BIGINT,
    "create_at" TIMESTAMPTZ(6),
    "update_at" TIMESTAMPTZ(6),
    "description" TEXT,
    "type_id" BIGINT,
    "location_id" BIGINT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" BIGINT NOT NULL,
    "lat" DECIMAL,
    "lng" DECIMAL,
    "location" TEXT,
    "district_id" BIGINT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" BIGINT NOT NULL,
    "country" TEXT,
    "lat" DECIMAL,
    "lng" DECIMAL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" BIGINT NOT NULL,
    "province" TEXT,
    "lat" DECIMAL,
    "lng" DECIMAL,
    "country_id" BIGINT,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" BIGINT NOT NULL,
    "lat" DECIMAL,
    "lng" DECIMAL,
    "province_id" BIGINT,
    "district" VARCHAR,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "url" TEXT,
    "alt" TEXT,
    "description" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageService" (
    "id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,

    CONSTRAINT "ImageService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesRooms" (
    "id" UUID NOT NULL,
    "image_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,

    CONSTRAINT "ImagesRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" UUID NOT NULL,
    "service_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "rating" BIGINT,
    "create_at" TIMESTAMP(3),
    "update_at" TIMESTAMP(3),
    "person_id" UUID,
    "parent_id" UUID,
    "service_id" UUID,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" UUID NOT NULL,
    "price" DECIMAL,
    "name" TEXT,
    "service_id" UUID,
    "availiable_from" DATE,
    "availiable_to" DATE,
    "status_id" BIGINT,
    "type_id" BIGINT,

    CONSTRAINT "ServiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceItemOff" (
    "id" UUID NOT NULL,
    "date_off" DATE NOT NULL,
    "service_item_id" UUID NOT NULL,

    CONSTRAINT "ServiceItemOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceItemServiceOccassion" (
    "id" UUID NOT NULL,
    "price_occassion" DECIMAL,
    "day" DATE NOT NULL,
    "note" TEXT,
    "service_item_id" UUID NOT NULL,

    CONSTRAINT "ServiceItemServiceOccassion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeHotel" (
    "id" BIGINT NOT NULL,
    "type" TEXT,

    CONSTRAINT "TypeHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelService" (
    "id" UUID NOT NULL,
    "quantity_room" BIGINT,
    "type_hotel_id" BIGINT,
    "service_id" UUID NOT NULL,

    CONSTRAINT "HotelService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesHotel" (
    "id" BIGINT NOT NULL,
    "amenity" TEXT,
    "icon" TEXT,

    CONSTRAINT "AmenitiesHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesHotels" (
    "id" UUID NOT NULL,
    "amenity_id" BIGINT NOT NULL,
    "hote_id" UUID NOT NULL,

    CONSTRAINT "AmenitiesHotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenity_hotel" (
    "id" BIGSERIAL NOT NULL,
    "amenity" VARCHAR(150) NOT NULL,
    "icon" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "amenity_hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" BIGINT NOT NULL,
    "room_type" TEXT,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" UUID NOT NULL,
    "room_type_id" BIGINT,
    "area" DECIMAL,
    "max_people" BIGINT,
    "service_item_id" UUID NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenityRoom" (
    "id" BIGINT NOT NULL,
    "amenity" TEXT,
    "icon" TEXT,

    CONSTRAINT "AmenityRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesRooms" (
    "id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "amenity_id" BIGINT NOT NULL,

    CONSTRAINT "AmenitiesRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeCar" (
    "id" BIGINT NOT NULL,
    "type" TEXT,

    CONSTRAINT "TypeCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmission" (
    "id" BIGINT NOT NULL,
    "tranmission" TEXT,

    CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalCarService" (
    "id" UUID NOT NULL,
    "info" TEXT,
    "service_id" UUID NOT NULL,

    CONSTRAINT "RentalCarService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" UUID NOT NULL,
    "car_type_id" BIGINT,
    "transmission_id" BIGINT,
    "service_item_id" UUID NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenityCar" (
    "id" BIGINT NOT NULL,
    "amenity" TEXT,
    "icon" TEXT,

    CONSTRAINT "AmenityCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesCars" (
    "id" UUID NOT NULL,
    "amenity_id" BIGINT NOT NULL,
    "car_id" UUID NOT NULL,

    CONSTRAINT "AmenitiesCars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThingToDoService" (
    "id" UUID NOT NULL,
    "info" TEXT,
    "service_id" UUID NOT NULL,

    CONSTRAINT "ThingToDoService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenityThingToDo" (
    "id" BIGINT NOT NULL,
    "amenity" TEXT,
    "icon" TEXT,

    CONSTRAINT "AmenityThingToDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenitiesThingToDo" (
    "id" UUID NOT NULL,
    "ttd_id" UUID NOT NULL,
    "amenity_id" BIGINT NOT NULL,

    CONSTRAINT "AmenitiesThingToDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TtdItem" (
    "id" UUID NOT NULL,
    "location_id" UUID,
    "duration" TIMESTAMPTZ(6),
    "max_people" BIGINT,
    "service_item_id" UUID NOT NULL,

    CONSTRAINT "TtdItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeBooking" (
    "id" BIGINT NOT NULL,
    "type_booking" TEXT,

    CONSTRAINT "TypeBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "booking_type_id" BIGINT,
    "total_amount" DECIMAL,
    "check_in" TIMESTAMPTZ(6),
    "check_out" TIMESTAMPTZ(6),
    "service_id" UUID,
    "create_at" TIMESTAMPTZ(6),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingRoom" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,

    CONSTRAINT "BookingRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingCar" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "car_id" UUID NOT NULL,
    "pick_up" BIGINT,
    "drop_off" BIGINT,

    CONSTRAINT "BookingCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingThingToDo" (
    "id" UUID NOT NULL,
    "adult" BIGINT,
    "ttd_item_id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,

    CONSTRAINT "BookingThingToDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" BIGINT NOT NULL,
    "payment_method" TEXT,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusPayment" (
    "id" BIGINT NOT NULL,
    "status" TEXT,

    CONSTRAINT "StatusPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "booking_id" UUID,
    "amount" DECIMAL,
    "payment_method_id" BIGINT,
    "status_id" BIGINT,
    "fee" DECIMAL,
    "is_refund" BOOLEAN NOT NULL DEFAULT false,
    "raw_response" JSONB,
    "create_at" TIMESTAMPTZ(6),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" UUID NOT NULL,
    "payment_id" UUID NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusRefundRequest" (
    "id" BIGINT NOT NULL,
    "status" TEXT,

    CONSTRAINT "StatusRefundRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefundRequest" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "reason" TEXT,
    "status_id" BIGINT,

    CONSTRAINT "RefundRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefundEvidence" (
    "id" UUID NOT NULL,
    "refund_request_id" UUID NOT NULL,
    "upload_by_id" UUID NOT NULL,
    "file_url" TEXT,
    "file_type" TEXT,
    "upload_at" TIMESTAMPTZ(6),

    CONSTRAINT "RefundEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" UUID NOT NULL,
    "code" TEXT,
    "expire_at" TIMESTAMPTZ(6),
    "create_at" TIMESTAMPTZ(6),
    "email" TEXT,
    "is_used" BOOLEAN,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AmenitiesHotelToAmenityHotel" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL,

    CONSTRAINT "_AmenitiesHotelToAmenityHotel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_family_idx" ON "RefreshToken"("family");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HotelService_service_id_key" ON "HotelService"("service_id");

-- CreateIndex
CREATE INDEX "amenity_hotel_amenity_idx" ON "amenity_hotel"("amenity");

-- CreateIndex
CREATE UNIQUE INDEX "RentalCarService_service_id_key" ON "RentalCarService"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "ThingToDoService_service_id_key" ON "ThingToDoService"("service_id");

-- CreateIndex
CREATE INDEX "_AmenitiesHotelToAmenityHotel_B_index" ON "_AmenitiesHotelToAmenityHotel"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionRole" ADD CONSTRAINT "PermissionRole_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionRole" ADD CONSTRAINT "PermissionRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "TypeService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Province" ADD CONSTRAINT "Province_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageService" ADD CONSTRAINT "ImageService_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageService" ADD CONSTRAINT "ImageService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesRooms" ADD CONSTRAINT "ImagesRooms_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesRooms" ADD CONSTRAINT "ImagesRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItemOff" ADD CONSTRAINT "ServiceItemOff_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceItemServiceOccassion" ADD CONSTRAINT "ServiceItemServiceOccassion_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelService" ADD CONSTRAINT "HotelService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelService" ADD CONSTRAINT "HotelService_type_hotel_id_fkey" FOREIGN KEY ("type_hotel_id") REFERENCES "TypeHotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesHotels" ADD CONSTRAINT "AmenitiesHotels_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "amenity_hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesHotels" ADD CONSTRAINT "AmenitiesHotels_hote_id_fkey" FOREIGN KEY ("hote_id") REFERENCES "HotelService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "RoomType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesRooms" ADD CONSTRAINT "AmenitiesRooms_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesRooms" ADD CONSTRAINT "AmenitiesRooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalCarService" ADD CONSTRAINT "RentalCarService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_car_type_id_fkey" FOREIGN KEY ("car_type_id") REFERENCES "TypeCar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_transmission_id_fkey" FOREIGN KEY ("transmission_id") REFERENCES "Transmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesCars" ADD CONSTRAINT "AmenitiesCars_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesCars" ADD CONSTRAINT "AmenitiesCars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThingToDoService" ADD CONSTRAINT "ThingToDoService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesThingToDo" ADD CONSTRAINT "AmenitiesThingToDo_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "AmenityThingToDo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmenitiesThingToDo" ADD CONSTRAINT "AmenitiesThingToDo_ttd_id_fkey" FOREIGN KEY ("ttd_id") REFERENCES "ThingToDoService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TtdItem" ADD CONSTRAINT "TtdItem_service_item_id_fkey" FOREIGN KEY ("service_item_id") REFERENCES "ServiceItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_booking_type_id_fkey" FOREIGN KEY ("booking_type_id") REFERENCES "TypeBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRoom" ADD CONSTRAINT "BookingRoom_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRoom" ADD CONSTRAINT "BookingRoom_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingCar" ADD CONSTRAINT "BookingCar_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingCar" ADD CONSTRAINT "BookingCar_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingCar" ADD CONSTRAINT "BookingCar_drop_off_fkey" FOREIGN KEY ("drop_off") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingCar" ADD CONSTRAINT "BookingCar_pick_up_fkey" FOREIGN KEY ("pick_up") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingThingToDo" ADD CONSTRAINT "BookingThingToDo_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingThingToDo" ADD CONSTRAINT "BookingThingToDo_ttd_item_id_fkey" FOREIGN KEY ("ttd_item_id") REFERENCES "TtdItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusPayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundRequest" ADD CONSTRAINT "RefundRequest_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundRequest" ADD CONSTRAINT "RefundRequest_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundRequest" ADD CONSTRAINT "RefundRequest_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "StatusRefundRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundEvidence" ADD CONSTRAINT "RefundEvidence_refund_request_id_fkey" FOREIGN KEY ("refund_request_id") REFERENCES "RefundRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundEvidence" ADD CONSTRAINT "RefundEvidence_upload_by_id_fkey" FOREIGN KEY ("upload_by_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenitiesHotelToAmenityHotel" ADD CONSTRAINT "_AmenitiesHotelToAmenityHotel_A_fkey" FOREIGN KEY ("A") REFERENCES "AmenitiesHotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenitiesHotelToAmenityHotel" ADD CONSTRAINT "_AmenitiesHotelToAmenityHotel_B_fkey" FOREIGN KEY ("B") REFERENCES "amenity_hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
