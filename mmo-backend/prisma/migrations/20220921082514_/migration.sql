/*
  Warnings:

  - You are about to drop the column `endDate` on the `Sub` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Sub` table. All the data in the column will be lost.
  - Added the required column `expiredDate` to the `Sub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Sub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sub" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "expiredDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;
