-- CreateEnum
CREATE TYPE "StatusNumber" AS ENUM ('active', 'deactive');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "gender" TEXT,
    "birthdate" TIMESTAMP(3),
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNumber" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "userId" INTEGER,
    "status" "StatusNumber" NOT NULL DEFAULT 'deactive',
    "sessionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserNumber_number_key" ON "UserNumber"("number");

-- AddForeignKey
ALTER TABLE "UserNumber" ADD CONSTRAINT "UserNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
