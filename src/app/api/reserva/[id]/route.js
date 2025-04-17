import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, context) {
  const { params } = context;
  const id = parseInt(params.id); // <- id vem da URL
  const data = await request.json();

  try {
    const reservaAtualizada = await prisma.reserva.update({
      where: { id },
      data: {
        dataReserva: new Date(data.dataReserva),
        horario: data.horario,
        pessoas: data.pessoas,
      },
      include: {
        restaurant: true, // ← para atualizar a exibição
      },
    });

    return NextResponse.json(reservaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar reserva" },
      { status: 500 }
    );
  }
}
