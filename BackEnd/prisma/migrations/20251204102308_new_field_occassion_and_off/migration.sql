/*
  Warnings:

  - You are about to drop the column `date_off` on the `ServiceItemOff` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `ServiceItemServiceOccassion` table. All the data in the column will be lost.
  - Added the required column `date_off_start` to the `ServiceItemOff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DateOccassionStart` to the `ServiceItemServiceOccassion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceItemOff" DROP COLUMN "date_off",
ADD COLUMN     "date_off_end" DATE,
ADD COLUMN     "date_off_start" DATE NOT NULL;

-- AlterTable
ALTER TABLE "ServiceItemServiceOccassion" DROP COLUMN "day",
ADD COLUMN     "DateOccassionEnd" DATE,
ADD COLUMN     "DateOccassionStart" DATE NOT NULL;
