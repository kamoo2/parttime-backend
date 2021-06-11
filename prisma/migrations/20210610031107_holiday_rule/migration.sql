-- CreateTable
CREATE TABLE "Holiday" (
    "id" SERIAL NOT NULL,
    "holiday" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "rule" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HolidayToStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RuleToStore" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Holiday.holiday_unique" ON "Holiday"("holiday");

-- CreateIndex
CREATE UNIQUE INDEX "Rule.rule_unique" ON "Rule"("rule");

-- CreateIndex
CREATE UNIQUE INDEX "_HolidayToStore_AB_unique" ON "_HolidayToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_HolidayToStore_B_index" ON "_HolidayToStore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RuleToStore_AB_unique" ON "_RuleToStore"("A", "B");

-- CreateIndex
CREATE INDEX "_RuleToStore_B_index" ON "_RuleToStore"("B");

-- AddForeignKey
ALTER TABLE "_HolidayToStore" ADD FOREIGN KEY ("A") REFERENCES "Holiday"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HolidayToStore" ADD FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleToStore" ADD FOREIGN KEY ("A") REFERENCES "Rule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RuleToStore" ADD FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
