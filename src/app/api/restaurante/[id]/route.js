import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const { id } = await context.params; // ✅ importante usar await aqui

  try {
    const restaurante = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurante) {
      return new Response(
        JSON.stringify({ message: "Restaurante não encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(restaurante), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    return new Response(
      JSON.stringify({ message: "Erro interno do servidor" }),
      { status: 500 }
    );
  }
}
