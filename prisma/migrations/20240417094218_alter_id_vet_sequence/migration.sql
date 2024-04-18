-- AlterTable
CREATE SEQUENCE vet_id_seq;
ALTER TABLE "Vet" ALTER COLUMN "id" SET DEFAULT nextval('vet_id_seq');
ALTER SEQUENCE vet_id_seq OWNED BY "Vet"."id";

ALTER SEQUENCE "vet_id_seq" MINVALUE 0 START 0 RESTART 0;