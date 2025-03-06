"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";

// Definição do AuthLayout diretamente dentro do arquivo
function AuthLayout({ children, title, description }) {
  return (
    <div className="min-h-screen flex">
      {/* Esquerda - Formulário */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-800">GastroTime</h2>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Direita - Background Roxo */}
      <div className="hidden lg:block lg:w-1/2 bg-purple-500">
        <div className="h-full flex flex-col justify-center p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">
            Descubra os melhores sabores da cidade
          </h2>
          <p className="mb-12">
            Acesse sua conta para reservar mesas nos melhores restaurantes e
            aproveitar ofertas exclusivas.
          </p>

          {/* Testemunho */}
          <div className="bg-purple-400/30 rounded-lg p-6 backdrop-blur-sm">
            <p className="italic mb-4">
              "O GastroTime revolucionou a forma como eu descubro novos
              restaurantes. Interface intuitiva e recomendações perfeitas!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center mr-3">
                <span className="text-purple-700">MO</span>
              </div>
              <div>
                <p className="font-medium">Maria Oliveira</p>
                <div className="flex text-yellow-300">
                  <span>★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Definição dos tipos esperados nas props usando PropTypes
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Erro ao fazer login: " + result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      description="Gerencie suas reservas e descubra experiências gastronômicas exclusivas."
    >
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-purple-600 hover:text-purple-500"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition-colors"
        >
          Entrar
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Não tem uma conta?{" "}
        <Link
          href="/cadastro"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  );
}
