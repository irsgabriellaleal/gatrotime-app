import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const reservas = await prisma.reserva.findMany({
      where: { userId },
      include: {
        restaurant: true, // <- MUITO IMPORTANTE!
      },
      orderBy: { dataReserva: "desc" },
    });

    return NextResponse.json(reservas);
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar reservas" },
      { status: 500 }
    );
  }
}
