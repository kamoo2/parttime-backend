-- DropForeignKey
ALTER TABLE "Workday" DROP CONSTRAINT "Workday_employeeId_fkey";

-- CreateTable
CREATE TABLE "_EmployeeToWorkday" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToWorkday_AB_unique" ON "_EmployeeToWorkday"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToWorkday_B_index" ON "_EmployeeToWorkday"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeToWorkday" ADD FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToWorkday" ADD FOREIGN KEY ("B") REFERENCES "Workday"("id") ON DELETE CASCADE ON UPDATE CASCADE;
