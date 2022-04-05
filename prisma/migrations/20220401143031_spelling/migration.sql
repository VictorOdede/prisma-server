/*
  Warnings:

  - You are about to drop the column `acccountNumber` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountNumber]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Business_acccountNumber_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "acccountNumber",
ADD COLUMN     "accountNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_accountNumber_key" ON "Business"("accountNumber");
