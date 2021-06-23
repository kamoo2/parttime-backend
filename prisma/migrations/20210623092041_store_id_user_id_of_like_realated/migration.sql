/*
  Warnings:

  - A unique constraint covering the columns `[storeId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.storeId_userId_unique" ON "Like"("storeId", "userId");
