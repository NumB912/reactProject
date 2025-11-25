-- CreateTable
CREATE TABLE "Request_become_supplier" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "status" VARCHAR,
    "name" VARCHAR,

    CONSTRAINT "Request_become_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request_become_supplier_evidence" (
    "id" UUID NOT NULL,
    "upload_by_id" UUID,
    "file_url" VARCHAR,
    "file_type" VARCHAR,
    "upload_at" TIMESTAMPTZ(6),
    "request_id" UUID,

    CONSTRAINT "Request_become_supplier_evidence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request_become_supplier" ADD CONSTRAINT "Request_become_supplier_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Request_become_supplier_evidence" ADD CONSTRAINT "Request_become_supplier_evidence_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request_become_supplier_evidence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Request_become_supplier_evidence" ADD CONSTRAINT "Request_become_supplier_evidence_upload_by_id_fkey" FOREIGN KEY ("upload_by_id") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
