-- DropIndex
DROP INDEX "AmenityRoom_id_key";

-- AlterTable
CREATE SEQUENCE amenityroom_id_seq;
ALTER TABLE "AmenityRoom" ALTER COLUMN "id" SET DEFAULT nextval('amenityroom_id_seq');
ALTER SEQUENCE amenityroom_id_seq OWNED BY "AmenityRoom"."id";
