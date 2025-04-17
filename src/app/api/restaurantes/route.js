import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const restaurantes = await prisma.restaurant.findMany();
    return Response.json(restaurantes);
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error);
    return new Response(
      JSON.stringify({ message: "Erro interno do servidor" }),
      { status: 500 }
    );
  }
}
