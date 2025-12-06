-- DropForeignKey
ALTER TABLE "Document_supplier" DROP CONSTRAINT "Request_become_supplier_evidence_request_id_fkey";

-- AlterTable
ALTER TABLE "Document_supplier" RENAME CONSTRAINT "Request_become_supplier_evidence_pkey" TO "Document_supplier_pkey";

-- AddForeignKey
ALTER TABLE "Document_supplier" ADD CONSTRAINT "Request_become_supplier_evidence_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request_become_supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
