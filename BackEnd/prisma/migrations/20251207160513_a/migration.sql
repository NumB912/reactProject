/*
  Warnings:

  - You are about to drop the column `company` on the `Person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "company";

-- AlterTable
ALTER TABLE "Request_become_supplier" ADD COLUMN     "company_name" TEXT;
