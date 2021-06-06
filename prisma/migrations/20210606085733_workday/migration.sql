/*
  Warnings:

  - Added the required column `workTime` to the `Workday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workday" ADD COLUMN     "workTime" INTEGER NOT NULL;
