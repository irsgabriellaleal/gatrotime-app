/*
  Warnings:

  - You are about to drop the column `slugRestaurante` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `restauranteId` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "slugRestaurante",
ADD COLUMN     "restauranteId" TEXT NOT NULL;
