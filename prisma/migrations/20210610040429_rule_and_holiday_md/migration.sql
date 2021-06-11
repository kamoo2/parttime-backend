/*
  Warnings:

  - You are about to drop the column `holiday` on the `Holiday` table. All the data in the column will be lost.
  - You are about to drop the column `rule` on the `Rule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Holiday` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Rule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Holiday.holiday_unique";

-- DropIndex
DROP INDEX "Rule.rule_unique";

-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "holiday",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "rule",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Holiday.name_unique" ON "Holiday"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rule.name_unique" ON "Rule"("name");
