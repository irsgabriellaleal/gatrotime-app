"use client";

import { useState } from "react";
import { MapPin, Search, Utensils } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Utensils className="h-8 w-8 text-purple-800" />
            <h1 className="text-purple-800 text-2xl font-bold ml-2">
              GastroTime
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">São Paulo</span>
            </div>
            <a href="#" className="text-gray-700 hover:text-purple-800">
              Reserva
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-800">
              Restaurantes
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-800">
              Categorias
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/login">
              <button
                onClick={toggleLoginModal}
                className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded-md"
              >
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="bg-gray-600 text-white py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra e Reserve os Melhores Restaurantes
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Encontre experiências gastronômicas únicas e reserve sua mesa em
            segundos
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busque por restaurantes ou cozinhas..."
                  className="pl-10 pr-3 py-3 w-full rounded-l-md focus:outline-none text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-r-md">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
