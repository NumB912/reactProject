-- AlterTable
CREATE SEQUENCE amenitycar_id_seq;
ALTER TABLE "AmenityCar" ALTER COLUMN "id" SET DEFAULT nextval('amenitycar_id_seq');
ALTER SEQUENCE amenitycar_id_seq OWNED BY "AmenityCar"."id";
