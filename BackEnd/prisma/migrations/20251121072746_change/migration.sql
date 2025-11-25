/*
  Warnings:

  - You are about to drop the `Request_become_supplier_evidence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request_become_supplier_evidence" DROP CONSTRAINT "Request_become_supplier_evidence_request_id_fkey";

-- DropForeignKey
ALTER TABLE "Request_become_supplier_evidence" DROP CONSTRAINT "Request_become_supplier_evidence_upload_by_id_fkey";

-- DropTable
DROP TABLE "Request_become_supplier_evidence";

-- CreateTable
CREATE TABLE "Document_supplier" (
    "id" UUID NOT NULL,
    "upload_by_id" UUID,
    "file_url" VARCHAR,
    "file_type" VARCHAR,
    "upload_at" TIMESTAMPTZ(6),
    "request_id" UUID,

    CONSTRAINT "Request_become_supplier_evidence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document_supplier" ADD CONSTRAINT "Request_become_supplier_evidence_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Document_supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Document_supplier" ADD CONSTRAINT "Request_become_supplier_evidence_upload_by_id_fkey" FOREIGN KEY ("upload_by_id") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
