/*
  Warnings:

  - Added the required column `cidade` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoCozinha` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "nota" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tipoCozinha" TEXT NOT NULL;
