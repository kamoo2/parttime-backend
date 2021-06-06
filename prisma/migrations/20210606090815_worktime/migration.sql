/*
  Warnings:

  - You are about to drop the column `workTime` on the `Workday` table. All the data in the column will be lost.
  - Added the required column `workTimeId` to the `Workday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workday" DROP COLUMN "workTime",
ADD COLUMN     "workTimeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WorkTime" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workday" ADD FOREIGN KEY ("workTimeId") REFERENCES "WorkTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
