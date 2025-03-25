/*
  Warnings:

  - You are about to drop the column `data` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `dataReserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "data",
ADD COLUMN     "dataReserva" TIMESTAMP(3) NOT NULL;
