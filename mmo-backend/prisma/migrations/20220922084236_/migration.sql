/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Sub` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Sub` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sub" DROP COLUMN "expiredAt",
DROP COLUMN "startAt";

-- CreateTable
CREATE TABLE "SubHistory" (
    "id" TEXT NOT NULL,
    "subid" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubHistory" ADD CONSTRAINT "SubHistory_subid_fkey" FOREIGN KEY ("subid") REFERENCES "Sub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
