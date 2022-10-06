/*
  Warnings:

  - You are about to drop the column `pricePerMonth` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerYear` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `price` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "pricePerMonth",
DROP COLUMN "pricePerYear",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
