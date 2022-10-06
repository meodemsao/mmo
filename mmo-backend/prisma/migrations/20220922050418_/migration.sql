/*
  Warnings:

  - You are about to drop the column `accountLicenseId` on the `Sub` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Sub_accountLicenseId_key";

-- AlterTable
ALTER TABLE "Sub" DROP COLUMN "accountLicenseId";
