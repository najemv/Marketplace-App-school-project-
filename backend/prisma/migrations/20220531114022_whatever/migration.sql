/*
  Warnings:

  - You are about to alter the column `nickname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(256),
ALTER COLUMN "nickname" SET DATA TYPE VARCHAR(32);
