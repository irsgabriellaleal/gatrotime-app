import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.restaurant.createMany({
    data: [
      {
        name: "Vila Sabor & Arte",
        description: "Comida autoral e italiana no coração do Jardins.",
        location: "Rua das Violetas, 123 - Jardins, São Paulo, SP",
        cidade: "São Paulo",
        tipoCozinha: "Italiana • Autoral",
        nota: 4.6,
      },
      {
        name: "Trattoria Moderna",
        description: "Tradição e inovação na culinária mediterrânea.",
        location: "Av. Europa, 456 - Pinheiros, SP",
        cidade: "São Paulo",
        tipoCozinha: "Mediterrânea • Contemporânea",
        nota: 4.7,
      },
      {
        name: "Estação Gourmet",
        description: "Comida brasileira criativa com ingredientes frescos.",
        location: "Rua Aurora, 789 - Vila Madalena, SP",
        cidade: "São Paulo",
        tipoCozinha: "Brasileira • Criativa",
        nota: 4.8,
      },
    ],
  });

  console.log("✅ Restaurantes inseridos com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro ao inserir dados:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
