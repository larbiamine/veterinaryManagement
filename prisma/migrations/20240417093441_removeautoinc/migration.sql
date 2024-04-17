-- AlterTable
CREATE SEQUENCE vet_id_seq;
ALTER TABLE "Vet" ALTER COLUMN "id" SET DEFAULT nextval('vet_id_seq');
ALTER SEQUENCE vet_id_seq OWNED BY "Vet"."id";
