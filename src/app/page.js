"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Search, Star, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RestaurantHomepage() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    fetch("/api/restaurantes")
      .then((res) => res.json())
      .then((data) => setRestaurantes(data))
      .catch((err) => console.error("Erro ao buscar restaurantes:", err));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">GastroTime</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Restaurantes
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Como Funciona
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
            >
              Contato
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium hidden sm:block">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-purple-900 mb-6">
              Reserve seu restaurante favorito em segundos
            </h1>
            <p className="text-lg md:text-xl text-purple-700 max-w-2xl mb-10">
              Encontre e reserve os melhores restaurantes da sua cidade com
              apenas alguns cliques.
            </p>
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                <Input
                  placeholder="Buscar por restaurante ou tipo de cozinha"
                  className="pl-10 border-purple-200 focus-visible:ring-purple-500"
                />
              </div>
              <div className="flex-1 flex gap-2">
                <Input
                  type="date"
                  className="border-purple-200 focus-visible:ring-purple-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700 px-8">
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              Restaurantes em Destaque
            </h2>
            <p className="text-purple-600 max-w-2xl text-center">
              Descubra os restaurantes mais populares e bem avaliados da cidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantes.length === 0 ? (
              <p className="text-center col-span-full text-purple-500">
                Nenhum restaurante encontrado no momento.
              </p>
            ) : (
              restaurantes.map((restaurante) => (
                <Card
                  key={restaurante.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-purple-100 flex items-center justify-center text-2xl font-bold text-purple-600">
                    {restaurante?.name?.split(" ")[0] || "Restaurante"}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-purple-900">
                        {restaurante.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-md">
                        <Star className="h-4 w-4 fill-purple-500 text-purple-500" />
                        <span className="text-sm font-medium text-purple-700">
                          {restaurante.nota?.toFixed(1) || "-"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-purple-600 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{restaurante.cidade}</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-600 mb-4">
                      <Utensils className="h-4 w-4" />
                      <span className="text-sm">{restaurante.tipoCozinha}</span>
                    </div>
                    <Link href={`/reserva?restauranteId=${restaurante.id}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Reservar Mesa
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Ver Mais Restaurantes
            </Button>
          </div>
        </section>

        <section className="py-16 bg-purple-50">
          <div className="container">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">
                Como Funciona
              </h2>
              <p className="text-purple-600 max-w-2xl text-center">
                Reservar uma mesa nunca foi tão fácil. Siga estes simples
                passos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Search className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Busque
                </h3>
                <p className="text-purple-600">
                  Encontre o restaurante perfeito por localização, tipo de
                  cozinha ou nome.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Escolha
                </h3>
                <p className="text-purple-600">
                  Selecione a data, horário e número de pessoas para sua
                  reserva.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  Reserve
                </h3>
                <p className="text-purple-600">
                  Confirme sua reserva e receba a confirmação instantaneamente.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
