/*
  Warnings:

  - You are about to drop the column `expiredDate` on the `Sub` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `Sub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sub" DROP COLUMN "expiredDate",
ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL;
