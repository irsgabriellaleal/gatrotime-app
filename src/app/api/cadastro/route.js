import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  console.log("✅ Iniciando a API de Cadastro...");

  try {
    console.log("📥 Tentando receber JSON da requisição...");
    let body;
    try {
      body = await req.json();
      console.log("✅ JSON recebido:", body);
    } catch (jsonError) {
      console.error("❌ Erro ao processar JSON:", jsonError);
      return new Response(JSON.stringify({ error: "Erro ao processar JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🛑 Parar aqui se os dados estiverem indefinidos
    if (
      !body ||
      !body.firstname || // ❌ O JSON recebido tem firstName, mas aqui está firstname (minúsculo)
      !body.lastname ||
      !body.email ||
      !body.password
    ) {
      console.error("⚠️ Campos obrigatórios ausentes:", body);
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("🔍 Verificando se o e-mail já existe...");
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      console.log("⚠️ E-mail já cadastrado:", existingUser);
      return new Response(
        JSON.stringify({ error: "Este e-mail já está cadastrado" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("🔐 Criptografando senha...");
    const hashedPassword = await bcrypt.hash(body.password, 10);

    console.log("🛠 Criando usuário no banco de dados...");
    const user = await prisma.user.create({
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: hashedPassword,
      },
    });

    console.log("✅ Usuário cadastrado com sucesso:", user);

    return new Response(
      JSON.stringify({ message: "Usuário cadastrado com sucesso", user }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Erro no bloco `catch`:", error);

    return new Response(
      JSON.stringify({
        error: "Erro ao criar usuário",
        details: error.message || "Erro desconhecido",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
