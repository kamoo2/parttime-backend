/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Workday` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Workday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workday" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workday.slug_unique" ON "Workday"("slug");
