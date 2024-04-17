-- AlterTable
CREATE SEQUENCE animal_id_seq;
ALTER TABLE "Animal" ALTER COLUMN "id" SET DEFAULT nextval('animal_id_seq');
ALTER SEQUENCE animal_id_seq OWNED BY "Animal"."id";

-- AlterTable
CREATE SEQUENCE appointment_id_seq;
ALTER TABLE "Appointment" ALTER COLUMN "id" SET DEFAULT nextval('appointment_id_seq');
ALTER SEQUENCE appointment_id_seq OWNED BY "Appointment"."id";

-- AlterTable
CREATE SEQUENCE owner_id_seq;
ALTER TABLE "Owner" ALTER COLUMN "id" SET DEFAULT nextval('owner_id_seq');
ALTER SEQUENCE owner_id_seq OWNED BY "Owner"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";


ALTER SEQUENCE "animal_id_seq" MINVALUE 0 START 0 RESTART 0;
ALTER SEQUENCE "appointment_id_seq" MINVALUE 0 START 0 RESTART 0;
ALTER SEQUENCE "owner_id_seq" MINVALUE 0 START 0 RESTART 0;