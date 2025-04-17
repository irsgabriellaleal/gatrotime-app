import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const data = await req.json();

    const reserva = await prisma.reserva.create({
      data: {
        nome: data.name,
        email: data.email,
        telefone: data.phone,
        dataReserva: new Date(data.date),
        horario: data.time,
        pessoas: parseInt(data.guests),
        mensagem: data.specialRequests || "",
        restaurantId: data.restauranteId, // ← CORRETO AGORA
        userId: data.userId,
      },
    });

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar reserva:", error?.message || error);
    return NextResponse.json(
      { error: "Erro ao salvar reserva" },
      { status: 500 }
    );
  }
}
