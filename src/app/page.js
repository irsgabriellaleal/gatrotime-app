import { Calendar, Clock, MapPin, Search, Star, Utensils } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RestaurantHomepage() {
  const restaurantes = [
    {
      id: 1,
      slug: "vila-sabor",
      nome: "Vila Sabor & Arte",
      nota: 4.6,
      localizacao: "Jardins, São Paulo",
      cozinha: "Italiana • Autoral",
      imagem: "https://placehold.co/500x300/f5f3ff/a78bfa?text=Vila+Sabor",
    },
    {
      id: 2,
      slug: "trattoria-moderna",
      nome: "Trattoria Moderna",
      nota: 4.7,
      localizacao: "Pinheiros, SP",
      cozinha: "Mediterrânea • Contemporânea",
      imagem: "https://placehold.co/500x300/f5f3ff/a78bfa?text=Trattoria",
    },
    {
      id: 3,
      slug: "estacao-gourmet",
      nome: "Estação Gourmet",
      nota: 4.8,
      localizacao: "Vila Madalena, SP",
      cozinha: "Brasileira • Criativa",
      imagem: "https://placehold.co/500x300/f5f3ff/a78bfa?text=Gourmet",
    },
  ];

  const avaliacoes = [
    {
      id: 1,
      nome: "Gisela Santos",
      cidade: "São Paulo, SP",
      texto:
        "Incrível como é fácil fazer reservas! Usei para o aniversário do meu parceiro e tudo correu perfeitamente.",
      inicial: "G",
    },
    {
      id: 2,
      nome: "Izabella Queiroz",
      cidade: "Rio de Janeiro, RJ",
      texto:
        "O site é super intuitivo. Em poucos minutos consegui reservar para o jantar com meus pais!",
      inicial: "I",
    },
    {
      id: 3,
      nome: "Eduardo Costa",
      cidade: "Belo Horizonte, MG",
      texto:
        "Recomendo demais! Vários restaurantes bons e confirmação instantânea. Nota 10!",
      inicial: "E",
    },
  ];

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
            {restaurantes.map((restaurante) => (
              <Card
                key={restaurante.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={restaurante.imagem}
                    alt={restaurante.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-purple-900">
                      {restaurante.nome}
                    </h3>
                    <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-md">
                      <Star className="h-4 w-4 fill-purple-500 text-purple-500" />
                      <span className="text-sm font-medium text-purple-700">
                        {restaurante.nota.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{restaurante.localizacao}</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600 mb-4">
                    <Utensils className="h-4 w-4" />
                    <span className="text-sm">{restaurante.cozinha}</span>
                  </div>
                  <Link href={`/restaurantes/${restaurante.slug}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Reservar Mesa
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
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

        <section className="py-16 container">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-purple-600 max-w-2xl text-center">
              Milhares de pessoas usam o ReservaFácil para encontrar os melhores
              restaurantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {avaliacoes.map((avaliacao) => (
              <Card key={avaliacao.id} className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-purple-500 text-purple-500"
                      />
                    ))}
                </div>
                <p className="text-gray-600 mb-4">"{avaliacao.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                    <span className="text-purple-700 font-medium">
                      {avaliacao.inicial}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-purple-900">
                      {avaliacao.nome}
                    </p>
                    <p className="text-sm text-purple-600">
                      {avaliacao.cidade}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 bg-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para reservar sua mesa?
            </h2>
            <p className="text-purple-100 max-w-2xl mx-auto mb-8">
              Junte-se a milhares de pessoas que já descobriram a maneira mais
              fácil de reservar os melhores restaurantes.
            </p>
            <Button className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-6 text-lg">
              Comece a Reservar Agora
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-purple-900 text-purple-100 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-6 w-6 text-purple-300" />
                <span className="text-xl font-bold text-white">
                  ReservaFácil
                </span>
              </div>
              <p className="text-purple-300">
                A maneira mais fácil de reservar os melhores restaurantes da sua
                cidade.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Restaurantes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="text-purple-300">contato@reservafacil.com</li>
                <li className="text-purple-300">(11) 9999-9999</li>
                <li className="text-purple-300">São Paulo, SP - Brasil</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-purple-400">
            <p>
              &copy; {new Date().getFullYear()} ReservaFácil. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
