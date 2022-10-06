/*
  Warnings:

  - You are about to drop the column `subid` on the `SubHistory` table. All the data in the column will be lost.
  - Added the required column `subId` to the `SubHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubHistory" DROP CONSTRAINT "SubHistory_subid_fkey";

-- AlterTable
ALTER TABLE "SubHistory" DROP COLUMN "subid",
ADD COLUMN     "subId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SubHistory" ADD CONSTRAINT "SubHistory_subId_fkey" FOREIGN KEY ("subId") REFERENCES "Sub"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
