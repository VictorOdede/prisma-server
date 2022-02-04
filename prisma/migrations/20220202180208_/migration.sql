-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderNumber_fkey";

-- AlterTable
ALTER TABLE "Payer" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "senderNumber" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderNumber_fkey" FOREIGN KEY ("senderNumber") REFERENCES "Payer"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
