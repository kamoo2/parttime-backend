/*
  Warnings:

  - Added the required column `slug` to the `Workday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workday" ADD COLUMN     "slug" TEXT NOT NULL;
