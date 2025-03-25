import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ajuste se necessário

export async function POST(req) {
  try {
    const data = await req.json();

    const reserva = await prisma.reserva.create({
      data: {
        nome: data.name,
        email: data.email,
        telefone: data.phone,
        dataReserva: new Date(data.date), // garantir tipo Date
        horario: data.time,
        pessoas: parseInt(data.guests),
        mensagem: data.specialRequests || "",
        slugRestaurante: data.restaurante,
      },
    });

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar reserva:", error?.message || error); // <- segurança
    return NextResponse.json(
      { error: "Erro ao salvar reserva" },
      { status: 500 } // <- remover o bloco extra
    );
  }
}
