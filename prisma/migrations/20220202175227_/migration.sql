-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_ownerSacco_fkey";

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerSacco_fkey" FOREIGN KEY ("ownerSacco") REFERENCES "Owner"("businessShortcode") ON DELETE RESTRICT ON UPDATE CASCADE;
