/*
  Warnings:

  - You are about to drop the column `service_id` on the `Request_become_supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Request_become_supplier` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `Request_become_supplier` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Request_become_supplier" DROP CONSTRAINT "Request_become_supplier_service_id_fkey";

-- DropForeignKey
ALTER TABLE "Request_become_supplier" DROP CONSTRAINT "Request_become_supplier_user_id_fkey";

-- AlterTable
ALTER TABLE "Request_become_supplier" DROP COLUMN "service_id",
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "create_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_Document_supplierToRequest_become_supplier" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_Document_supplierToRequest_become_supplier_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Document_supplierToRequest_become_supplier_B_index" ON "_Document_supplierToRequest_become_supplier"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Request_become_supplier_user_id_key" ON "Request_become_supplier"("user_id");

-- AddForeignKey
ALTER TABLE "Request_become_supplier" ADD CONSTRAINT "Request_become_supplier_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Document_supplierToRequest_become_supplier" ADD CONSTRAINT "_Document_supplierToRequest_become_supplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Document_supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Document_supplierToRequest_become_supplier" ADD CONSTRAINT "_Document_supplierToRequest_become_supplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Request_become_supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
