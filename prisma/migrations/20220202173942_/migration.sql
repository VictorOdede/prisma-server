-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN');

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "sacco" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "businessShortcode" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'OWNER',

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" INTEGER NOT NULL,

    CONSTRAINT "Payer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "passengers" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "ownerSacco" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderNumber" INTEGER NOT NULL,
    "recepientPlate" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_sacco_key" ON "Owner"("sacco");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_businessShortcode_key" ON "Owner"("businessShortcode");

-- CreateIndex
CREATE UNIQUE INDEX "Payer_phone_key" ON "Payer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registration_key" ON "Vehicle"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_phone_key" ON "Vehicle"("phone");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerSacco_fkey" FOREIGN KEY ("ownerSacco") REFERENCES "Owner"("sacco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderNumber_fkey" FOREIGN KEY ("senderNumber") REFERENCES "Payer"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_recepientPlate_fkey" FOREIGN KEY ("recepientPlate") REFERENCES "Vehicle"("registration") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
